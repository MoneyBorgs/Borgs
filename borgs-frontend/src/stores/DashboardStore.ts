import { AxiosResponse } from "axios";
import { action, makeAutoObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Dashboard from "../model/Dashboard"
import CategoryBalance from "../model/CategoryBalance"
import ExpensesIncomes from "../model/ExpensesIncomes"
import RootStore from "./RootStore";

export default class DashboardStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;

		// Update cache
		this.updateTotalBalance();
		this.updateBalance();
		this.updateTopCategories();
	}

	@observable currentBalancesData : Dashboard[] = [];
	@observable currentTopCategories : CategoryBalance[] = [];
	@observable currentExpensesIncomes : ExpensesIncomes[] = [];
	@observable currentTotalBalance : number = 0;

	@action
    updateBalance() {
		const {userStore} = this.rootStore
		console.log(userStore.uid)
		console.log('Update pa')
        axiosRequest.get(`/balances/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Dashboard[], any> => this.currentBalancesData = res.data));
    }

	@action
    updateTotalBalance() {
		const {userStore} = this.rootStore
		console.log(userStore.uid)
		console.log('Update total balance')
        axiosRequest.get(`/total/${userStore.uid}`)
            .then(action((res) : AxiosResponse<number, any> => this.currentTotalBalance = res.data.balance));
    }

	@action
    updateTopCategories() {
		const {userStore} = this.rootStore
		console.log(userStore.uid)
		console.log('Update categories')
        axiosRequest.get(`/top_categories/${userStore.uid}`)
            .then(action((res) : AxiosResponse<CategoryBalance[], any> => this.currentTopCategories = res.data));
    }

	@action
    updateIncomesExpenses() {
		const {userStore} = this.rootStore
		console.log(userStore.uid)
		console.log('Update incomes and expenses')
        axiosRequest.get(`/expenses_incomes/${userStore.uid}`)
            .then(action((res) : AxiosResponse<ExpensesIncomes[], any> => this.currentExpensesIncomes = res.data));
    }
}

