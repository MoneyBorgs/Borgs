import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import MonthlyBalance from "../model/MonthlyBalance";

export default class ReportsStore {

	@observable currentBalance : number = 0;
	@observable monthlyBalance : MonthlyBalance[] = [];

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
            .then(action((res) : AxiosResponse<number, any> => {
				return this.currentBalance = res.data.sum
			}));
    }

	@action
	getMonthlyData(year: number) {
		const { userStore } = this.rootStore;

		console.log("");

        axiosRequest.get(`/monthly_balance/${userStore.uid}/${year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {
				return this.monthlyBalance = res.data
			})); 
	}
}