import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import Dashboard from "../model/Dashboard"
import CategoryBalance from "../model/CategoryBalance"
import RootStore from "./RootStore";
import UserStore from "./UserStore";

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
}

