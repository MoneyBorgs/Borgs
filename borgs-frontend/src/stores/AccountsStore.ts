import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import Account, { PhysicalAccount, VirtualAccount } from "../model/Account"
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import MonthlyBalance from "../model/MonthlyBalance";


export default class AccountsStore {
	rootStore : RootStore;
	userStore : UserStore;
	@observable adding_account : string = "physical"
	@observable monthlyBalance : MonthlyBalance[] = [];
	@observable totalAccountBalance : number = 0;
	@observable currentVirtualAccountsData : VirtualAccount[] = [];
	@observable currentPhysicalAccountsData : PhysicalAccount[] = [];

	@observable availablePhysicalAccounts: PhysicalAccount[] = [];
	@observable isUpdatingPhysicalAccount: boolean = false;

	@observable availableVirtualAccounts: VirtualAccount[] = [];
	@observable isUpdatingVirtualAccount: boolean = false;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
	}
	@action
    updateVirtualAccounts() {
		const {userStore} = this.rootStore
		console.log(this.userStore.uid);
        console.log("Updating virtual accounts");
		
        axiosRequest.get(`/virtualaccounts/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Account[], any> => this.currentVirtualAccountsData = res.data));
    }

	@action
	updatePhysicalAccounts() {
		const { userStore } = this.rootStore
		console.log(this.userStore.uid);
		console.log("Updating physical accounts");

		axiosRequest.get(`/physicalaccounts/${userStore.uid}`)
			.then(action((res): AxiosResponse<Account[], any> => this.currentPhysicalAccountsData = res.data));
	}
	@action
	getMonthlyVirtualAccountData(account_id : number, year: number) {

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

	getMonthlyPhysicalAccountData(account_id : number, year: number) {

		console.log("Getting physical id monthly balances");

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

	@action
    createNewPhysicalAccount(account: Account) {
        console.log(`Creating new physical account`);
		const { userStore } = this.rootStore;
        axiosRequest.post(`/physicalaccount/${userStore.uid}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.currentPhysicalAccountsData.push(res.data)
                }
            ));
    }
	@action
    createNewVirtualAccount(account: Account) {
        console.log(`Creating new virtual account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.post(`/virtualaccount/${userStore.uid}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.currentVirtualAccountsData.push(res.data)
                }
            ));
		
    }
	

}