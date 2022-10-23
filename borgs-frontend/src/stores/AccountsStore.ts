import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import Account, { PhysicalAccount, VirtualAccount } from "../model/Account"
import RootStore from "./RootStore";
import UserStore from "./UserStore";

export default class AccountsStore {
	rootStore : RootStore;
	userStore : UserStore;

	@observable currentVirtualAccountsData : Account[] = [];

	@observable availablePhysicalAccounts: PhysicalAccount[] = [];
	@observable isUpadtingPhysicalAccount: boolean = false;

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
	updatePhysicalAccounts(force: boolean) {
		if (!this.isUpadtingPhysicalAccount && (this.availablePhysicalAccounts.length === 0 || force)) {
			this.availablePhysicalAccounts = [{ "account_id": 1, "user_id": this.userStore.uid, name: "Account A" }];
		}

		return;
		// TODO Update accordingly
		if (!this.isUpadtingPhysicalAccount && (this.availablePhysicalAccounts.length === 0 || force)) {
			this.isUpadtingPhysicalAccount = true;
			console.log("Getting latest virtual accounts");

			axiosRequest.get(`/accounts/${this.userStore.uid}`)
				.then(action((res: AxiosResponse<VirtualAccount[], any>) => {
					this.isUpadtingPhysicalAccount = false;
					this.availablePhysicalAccounts = res.data;
				}));
		}
	}
}