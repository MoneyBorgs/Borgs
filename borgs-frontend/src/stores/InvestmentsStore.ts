import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import AccountsStore from "./AccountsStore";
import Investment from "../model/Investment";
import TableBalance from "../model/TableBalance";
import TransactionsStore from "./TransactionsStore";

export default class InvestmentsStore {

	@observable currentInvestment : Investment[] = [];

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