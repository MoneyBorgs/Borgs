import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import MonthlyBalance from "../model/MonthlyBalance";

export default class ReportsStore {

	@observable currentBalance : number = 0;
	@observable totalAccountBalance : number = 0;
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
	getMonthlyData(account_id : number, year: number) {

		console.log("Getting virtual id monthly balances");

        axiosRequest.get(`/monthly_balance/${account_id}/${year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {

				let total_balance : number = 0;

				for (let i = 0; i < res.data.length; i++) {
					total_balance += res.data[i]["net_result"]
				}

				this.totalAccountBalance = total_balance;

				return this.monthlyBalance = res.data
			})); 
	}
}