import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import MonthlyBalance from "../model/MonthlyBalance";
import TableBalance from "../model/TableBalance";

export default class ReportsStore {

	@observable currentBalance : number = 0;
	@observable virtualAccount : number = -1;
	@observable year : number = 2018;
	@observable totalAccountBalance : number = 0
	@observable monthlyBalance : MonthlyBalance[] = [];
	@observable tableBalance : TableBalance[] = [];

	rootStore : RootStore;
	userStore : UserStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
	}

	@action
    updateVirtualAccount(account_id) {
		const { userStore } = this.rootStore;
		this.virtualAccount = account_id
		this.getMonthlyData()
		return true
    }

	@action
    updateYear(year) {
		const { userStore } = this.rootStore;
		this.year = year
		this.getMonthlyData()
		return true
    }

	@action
	getMonthlyData() {

		console.log("Getting virtual id monthly balances");

        axiosRequest.get(`/monthly_balance/${this.virtualAccount}/${this.year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {

				let total_balance : number = 0;

				for (let i = 0; i < res.data.length; i++) {
					total_balance += res.data[i]["net_result"]
				}

				this.totalAccountBalance = total_balance;

				return this.monthlyBalance = res.data
			})); 
	}

	@action
	getTableData() {

		console.log("Getting data for reports table");

        axiosRequest.get(`/accounts_balance/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<TableBalance[], any> => {
				return this.tableBalance = res.data
			})); 
			  
	}
}