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
        // Calls a get request to get all virtual accounts for a given uid
		const {userStore} = this.rootStore
		console.log(this.userStore.uid);
        console.log("Updating virtual accounts");
		
        axiosRequest.get(`/virtualaccounts/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Account[], any> => this.currentVirtualAccountsData = res.data));
    }

	@action
	updatePhysicalAccounts() {
        // Calls a get request to get all physical accounts for a given uid
		const { userStore } = this.rootStore
		console.log(this.userStore.uid);
		console.log("Updating physical accounts");

		axiosRequest.get(`/physicalaccounts/${userStore.uid}`)
			.then(action((res): AxiosResponse<Account[], any> => this.currentPhysicalAccountsData = res.data));
	}
	@action
	getMonthlyVirtualAccountData(account_id : number, year: number) {
        // Calls a get request to get grouped virtual account data for a specific year and account
        // Can be used for graphs
		console.log("Getting virtual id monthly balances");

        axiosRequest.get(`/monthly_balance/${account_id}/${year}`)
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
        // Calls a get request to get grouped physical account data for a specific year and account
        // used for the graph
		console.log("Getting physical id monthly balances");

        axiosRequest.get(`/monthly_physical_balance/${account_id}/${year}`)
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
        // Calls a post request to create new physical account for specified user id
        console.log(`Creating new physical account`);
		const { userStore } = this.rootStore;
        axiosRequest.post(`/physicalaccount/${userStore.uid}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.currentPhysicalAccountsData.push(res.data)
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
    }
	@action
    createNewVirtualAccount(account: Account) {
        // Calls a post request to create new virtual account for specified user id
        console.log(`Creating new virtual account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.post(`/virtualaccount/${userStore.uid}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.currentVirtualAccountsData.push(res.data)
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
		
    }
	
	@action
    deleteVirtualAccount(account: Account) {
        // Calls a delete request to delete virtual account of that account id
        console.log(`Deleting virtual account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.delete(`/virtualaccount/${account.account_id}`)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.updateVirtualAccounts();
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
		
    }
	@action
    deletePhysicalAccount(account: Account) {
        // Calls a delete request to delete physical account of that account id
        console.log(`Deleting physical account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.delete(`/physicalaccount/${account.account_id}`)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.updatePhysicalAccounts();
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
		
    }
	@action
    editVirtualAccount(account: Account) {
        // Calls a put request to edit virtual account of that account id with specified new name
        console.log(`Editing physical account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.put(`/virtualaccount/${account.account_id}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.updateVirtualAccounts();
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
		
    }
	@action
    editPhysicalAccount(account: Account) {
        // Calls a put request to edit physical account of that account id with specified new name
        console.log(`Editing physical account AccountsStore`);
		const { userStore } = this.rootStore;
        axiosRequest.put(`/physicalaccount/${account.account_id}`, account)
            .then(action(
                (res: AxiosResponse<Account, any>) => {
                    this.updatePhysicalAccounts();
                }
            )).then(action(
			() => {
				this.rootStore.updateCache();
			}
		));
		
    }

}