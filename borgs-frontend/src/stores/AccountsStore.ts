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
	updatePhysicalAccounts() {
		const { userStore } = this.rootStore
		console.log(this.userStore.uid);
		console.log("Updating physical accounts");

		axiosRequest.get(`/physicalaccounts/${userStore.uid}`)
			.then(action((res): AxiosResponse<Account[], any> => this.availablePhysicalAccounts = res.data));
	}
}