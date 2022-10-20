import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import Category from "../model/Category";
import Tag from "../model/Tag";

export default class TransactionsStore {

    @observable isNewExpenseModalOpen : boolean = false;
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

    @action
    setNewExpenseModalState(shouldBeOpen : boolean) {
        this.isNewExpenseModalOpen = shouldBeOpen;
    }

    // TODO include filters
    @action
    updateTransactions() {
        console.log("Updating transactions");

        axiosRequest.get(`/transaction/${this.userStore.uid}`)
            .then(action((res) : AxiosResponse<Transaction[], any> => this.currentTransactionsData = res.data));
    }

    // TODO implement
    @action
    createNewTransaction(transaction: Transaction) {
        throw new Error('Method not implemented.');
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
    
    // getSomeRandomStuffFromAPI() {
    //     axiosRequest.get('/todos/1')
    //         .then(action((res) => this.test = res.data.title))
    //         .catch(err => console.log(err))
    // }
}