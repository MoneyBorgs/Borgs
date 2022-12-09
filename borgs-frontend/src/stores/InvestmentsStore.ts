import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import AccountsStore from "./AccountsStore";
import Investment from "../model/Investment";
import InvestmentTable from "../model/InvestmentTable";
import TransactionsStore from "./TransactionsStore";
import ReportsStore from "./ReportsStore";

export default class InvestmentsStore {

	@observable currentInvestment : Investment[] = [];
	@observable investmentsTable : InvestmentTable[] = [];
	@observable toBeLiquidated!: InvestmentTable;

	rootStore : RootStore;
	userStore : UserStore;
    transactionsStore : TransactionsStore;
	accountsStore : AccountsStore;
	reportsStore : ReportsStore;
	
	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
		this.accountsStore = this.rootStore.accountsStore;
        this.transactionsStore = this.rootStore.transactionsStore;
		this.reportsStore = this.rootStore.reportsStore;
	}

    @action
    updateInvestments() {
		this.getAllInvestments()
		this.reportsStore.updateReportsData();
    }

	@action
    liquidateInvestment(id) {
		// turn rowdata into investment type

		axiosRequest.delete(`/liquidate/${id}`,).
			then(action(
				(res: AxiosResponse<Investment, any>) => {
					this.updateInvestments()
				}
			)).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
    }

	@action
	getAllInvestments() {
		console.log("Getting data for investments table");

		axiosRequest.get(`/investment_table/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<InvestmentTable[], any> => {
				return this.investmentsTable = res.data;
			})); ;
	}

	@action
	createInvestment(investment: Investment) {
		console.log("Creating investment")

		axiosRequest.post(`/investment`, investment).
			then(action(
				(res: AxiosResponse<Investment, any>) => {
					this.currentInvestment.push(res.data);
					this.updateInvestments();
				}
			)).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
	}
}