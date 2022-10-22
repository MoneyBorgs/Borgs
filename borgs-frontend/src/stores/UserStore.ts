import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";

export default class ReportsStore {
	rootStore: RootStore;

	@observable uid = 1;
	
	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}

	@action
    updateUser(new_uid) {
        this.uid = new_uid
		console.log(this.uid)
		console.log(new_uid)
    }
}