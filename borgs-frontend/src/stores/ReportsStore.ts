import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";

export default class ReportsStore {

	@observable test = "";

	rootStore : RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}

	getSomeRandomStuffFromAPI() {
        axiosRequest.get('/accounts_balance/8')
            .then(action((res) => this.test = res.data.title))
            .catch(err => console.log(err));
		console.log("asdfasd");
    }
}