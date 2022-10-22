import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import Account from "../model/Account"
import RootStore from "./RootStore";
import UserStore from "./UserStore";

export default class AccountsStore {
	rootStore : RootStore;
	userStore : UserStore;
	@observable currentVirtualAccountsData : Account[] = [];
	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = this.rootStore.userStore;
	}
	@action
    updateVirtualAccounts() {
        console.log("Updating virtual accounts");
		
        axiosRequest.get(`/virtualaccounts/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<Account[], any> => this.currentVirtualAccountsData = res.data));
    }
}