import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import RootStore from "./RootStore";

export default class TransactionsStore {

    @observable isNewExpenseModalOpen : boolean = false;

    @observable currentTransactionsData : Transaction[] = [];

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    @action
    setNewExpenseModalState(shouldBeOpen : boolean) {
        this.isNewExpenseModalOpen = shouldBeOpen;
    }

    // TODO include filters
    @action
    updateTransactions() {
        const { userStore } = this.rootStore;

        console.log("Updating transactions");

        axiosRequest.get(`/transaction/${userStore.uid}`)
            .then(action((res) : AxiosResponse<Transaction[], any> => this.currentTransactionsData = res.data));
    }
    
    // getSomeRandomStuffFromAPI() {
    //     axiosRequest.get('/todos/1')
    //         .then(action((res) => this.test = res.data.title))
    //         .catch(err => console.log(err))
    // }
}