import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import AccountsStore from "./AccountsStore";
import MonthlyBalance from "../model/MonthlyBalance";
import TableBalance from "../model/TableBalance";

export default class ReportsStore {

	@observable currentBalance : number = 0;
	@observable virtualAccount : number = -1;
	@observable physicalAccount : number = -1;
	@observable year : number = 2022;
	@observable totalAccountBalance : number = 0
	@observable monthlyVaBalance : MonthlyBalance[] = [];
	@observable monthlyPaBalance : MonthlyBalance[] = [];
	@observable vaTableBalance : TableBalance[] = [];
	@observable paTableBalance : TableBalance[] = [];

	rootStore : RootStore;
	userStore : UserStore;
	accountsStore : AccountsStore;
	
	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
		this.accountsStore = this.rootStore.accountsStore;
	}

	@action
	updateReportsData() {
		this.getTableData();
		console.log("PRELOADING REPORTS DATA");
		setTimeout(() => {
			this.virtualAccount = this.accountsStore.currentVirtualAccountsData[0]["account_id"];
			this.getMonthlyVaData();

			this.physicalAccount = this.accountsStore.currentPhysicalAccountsData[0]["account_id"];
			this.getMonthlyPaData();
		}, 5000);
		return true;
	}

	@action
    updateVirtualAccount(account_id) {
		const { userStore } = this.rootStore;
		this.virtualAccount = account_id;
		this.getMonthlyVaData();
		return true;
    }

	@action
    updatePhysicalAccount(account_id) {
		const { userStore } = this.rootStore;
		this.physicalAccount = account_id;
		this.getMonthlyPaData();
		return true;
    }


	@action
    updateYear(year) {
		const { userStore } = this.rootStore;
		this.year = year;
		this.getMonthlyVaData();
		this.getMonthlyPaData();
		return true;
    }

	@action
	getMonthlyVaData() {
		console.log("Getting virtual id monthly balances");

        axiosRequest.get(`/reports_va_monthly_balance/${this.virtualAccount}/${this.year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {

				let total_balance : number = 0;

				for (let i = 0; i < res.data.length; i++) {
					total_balance += res.data[i]["net_result"]
				}

				this.totalAccountBalance = total_balance;

				return this.monthlyVaBalance = res.data;
			})); 
	}

	@action
	getMonthlyPaData() {
		console.log("Getting physical id monthly balances");

        axiosRequest.get(`/reports_pa_monthly_balance/${this.physicalAccount}/${this.year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {

				let total_balance : number = 0;

				for (let i = 0; i < res.data.length; i++) {
					total_balance += res.data[i]["net_result"]
				}

				this.totalAccountBalance = total_balance;

				return this.monthlyPaBalance = res.data;
			})); 
	}

	@action
	getTableData() {

		console.log("Getting data for reports tables");

        axiosRequest.get(`/reports_va_table/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<TableBalance[], any> => {
				return this.vaTableBalance = res.data;
			})); 

		axiosRequest.get(`/reports_pa_table/${this.userStore.uid}`)
			.then(action((res) : AxiosResponse<TableBalance[], any> => {
				return this.paTableBalance = res.data;
			})); 
			  
	}
}