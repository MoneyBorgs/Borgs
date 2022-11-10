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
	getMonthlyAccountData(year: number) {
		const { userStore } = this.rootStore;

		console.log("");

        axiosRequest.get(`/monthly_balance/${userStore.uid}/${year}/`)
            .then(action((res) : AxiosResponse<MonthlyBalance[], any> => {
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