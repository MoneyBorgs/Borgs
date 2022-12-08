import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import AccountsStore from "./AccountsStore";
import Investment from "../model/Investment";
import InvestmentTable from "../model/InvestmentTable";
import TransactionsStore from "./TransactionsStore";

export default class InvestmentsStore {

	@observable currentInvestment : Investment[] = [];
	@observable investmentsTable : InvestmentTable[] = [];

	rootStore : RootStore;
	userStore : UserStore;
    transactionsStore : TransactionsStore;
	accountsStore : AccountsStore;
	
	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
		this.accountsStore = this.rootStore.accountsStore;
        this.transactionsStore = this.rootStore.transactionsStore;
	}

    @action
    updateInvestments() {
		this.getAllInvestments()
    }

	@action
    liquidateInvestment(rowData) {
		// turn rowdata into investment type

		axiosRequest.delete(`/liquidate/${rowData.investment_id}`,).
			then(action(
				(res: AxiosResponse<Investment, any>) => {
					this.updateInvestments()
				}
			))	
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
					this.currentInvestment.push(res.data)
				}
			))
	}
}