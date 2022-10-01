import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";

export default class TransactionsStore {

    @observable test = "";

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    
    getSomeRandomStuffFromAPI() {
        axiosRequest.get('/todos/1')
            .then(action((res) => this.test = res.data.title))
            .catch(err => console.log(err))
    }
}