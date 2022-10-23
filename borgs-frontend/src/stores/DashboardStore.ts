import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import Dashboard from "../model/Dashboard"
import RootStore from "./RootStore";
import UserStore from "./UserStore";

export default class DashboardStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;

		// Update cache
		this.updateBalance();
	}

	@observable currentBalanacesData : Dashboard[] = [];

	@action
    updateBalance() {
		const {userStore} = this.rootStore
		console.log(userStore.uid)
		console.log('Update pa')
        axiosRequest.get(`/balances/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Dashboard[], any> => this.currentBalanacesData = res.data));
    }
}

