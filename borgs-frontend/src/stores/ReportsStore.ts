import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";

export default class ReportsStore {

	@observable currentBalance : number = 3.0;

	rootStore : RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}

	@action
    updateBalance() {
		const { userStore } = this.rootStore;

        console.log("Updating accounts balance");

        axiosRequest.get(`/accounts_balance/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Number> => this.currentBalance = res.data));

		console.log("imma die bruh");
    }
}