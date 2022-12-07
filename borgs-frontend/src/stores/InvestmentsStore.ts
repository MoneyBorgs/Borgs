import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import AccountsStore from "./AccountsStore";
import MonthlyBalance from "../model/MonthlyBalance";
import TableBalance from "../model/TableBalance";
import TransactionsStore from "./TransactionsStore";

export default class ReportsStore {

	@observable currentBalance : number = 0;

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
}