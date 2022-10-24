import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import Category from "../model/Category";
import Tag from "../model/Tag";

export default class TransactionsStore {

    @observable currentTransactionsData : Transaction[] = [];

    @observable availableCategories : Category[] = [];
    @observable isUpdatingCategories : boolean = false;

    @observable availableTags: Tag[] = [];

    rootStore: RootStore;
    userStore : UserStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.userStore = this.rootStore.userStore;
    }

    // TODO include filters
    @action
    updateTransactions() {
        console.log("Updating transactions");

        axiosRequest.get(`/transaction/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<Transaction[], any> => this.currentTransactionsData = res.data));
    }

    @action
    createNewTransaction(transaction: Transaction) {
        console.log(`Creating new transaction`);

        axiosRequest.post(`/transaction/${this.userStore.uid}`, transaction)
            .then(action(
                (res: AxiosResponse<Transaction, any>) => {
                    this.currentTransactionsData.push(res.data)
                }
            ));
    }

    @action
    updateAvailableCategories(force : boolean) {
        if(!this.isUpdatingCategories && (this.availableCategories.length === 0 || force)) {
            this.isUpdatingCategories = true;
            console.log("Getting latest categories");

            axiosRequest.get(`/category/${this.userStore.uid}`)
                .then(action((res: AxiosResponse<Category[], any>) => {
                    this.isUpdatingCategories = false;
                    this.availableCategories = res.data;
            }));
        }
    }

    @action
    updateAvailableTags() {
        console.log("Updating avaiable tags");

        axiosRequest.get(`/physicalaccounts/${this.userStore.uid}`)
            .then(action((res): AxiosResponse<Tag[], any> => this.availableTags = res.data));
    }

    @action
    getAvailable() {}
    
    // getSomeRandomStuffFromAPI() {
    //     axiosRequest.get('/todos/1')
    //         .then(action((res) => this.test = res.data.title))
    //         .catch(err => console.log(err))
    // }
}