import { AxiosResponse } from "axios";
import { action, makeAutoObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import { PhysicalAccount, VirtualAccount } from "../model/Account";
import Category from "../model/Category";
import RootStore from "./RootStore";
import UserStore from "./UserStore";

export default class AccountsStore {
	rootStore : RootStore;
	userStore : UserStore;

	@observable availableVirtualAccounts: VirtualAccount[] = [];
	@observable isUpdatingVirtualAccounts: boolean = false;

	@observable availablePhysicalAccounts: PhysicalAccount[] = [];
	@observable isUpadtingPhysicalAccount: boolean = false;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
		this.userStore = rootStore.userStore
	}

	@action
	updateVirtualAccounts(force: boolean) {
		if (!this.isUpdatingVirtualAccounts && (this.availableVirtualAccounts.length === 0 || force)) {
			this.availableVirtualAccounts = [{"account_id": 1, "user_id": this.userStore.uid, name: "Account A"}];
		}

		return;
		// TODO Update accordingly
		if (!this.isUpdatingVirtualAccounts && (this.availableVirtualAccounts.length === 0 || force)) {
			this.isUpdatingVirtualAccounts = true;
			console.log("Getting latest virtual accounts");

			axiosRequest.get(`/accounts/${this.userStore.uid}`)
				.then(action((res: AxiosResponse<VirtualAccount[], any>) => {
					this.isUpdatingVirtualAccounts = false;
					this.availableVirtualAccounts = res.data;
				}));
		}
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