import { AxiosResponse } from "axios";
import { action, makeAutoObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import Transaction from "../model/Transaction";
import DailyTransaction from "../model/DailyTransactions";
import RootStore from "./RootStore";
import UserStore from "./UserStore";
import Category from "../model/Category";
import Tag from "../model/Tag";
import dayjs from "dayjs";
import TransferTransaction from "../model/TransferTransaction";

export default class TransactionsStore {

    @observable currentTransactionsData : Transaction[] = [];

    @observable currentDailyTransactionsData : DailyTransaction[] = [];
    @observable currentLoadedStartDate : dayjs.Dayjs = dayjs();
    @observable currentLoadedEndDate : dayjs.Dayjs = dayjs();
    @observable isUpdatingDailyTransactionsData = false;

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
    updateTransactionsForDateRange(startDate : dayjs.Dayjs, endDate : dayjs.Dayjs) {
        console.log("Updating transactions");

        axiosRequest.get(`/transaction/${this.userStore.uid}?startDate=${startDate.unix()}&endDate=${endDate.unix()}`)
            .then(action((res) : AxiosResponse<Transaction[], any> => this.currentTransactionsData = res.data));
    }

    // TODO build proper TransactionDTO from Transaction i.e. missing convert category to category id
    @action
    createNewTransaction(transaction: Transaction) {
        console.log(`Creating new transaction`);

        axiosRequest.post(`/transaction/${this.userStore.uid}`, transaction)
            .then(action(
                (res: AxiosResponse<Transaction, any>) => {
                    this.updateDailyTransactionsForDateRange(this.currentLoadedStartDate, this.currentLoadedEndDate)
                }
            ));
    }

    @action
    createNewTransferTransaction(transaction: TransferTransaction) {
        console.log(`Creating new transfer transaction`);

        axiosRequest.post(`/transaction/transfer/${this.userStore.uid}`, transaction)
            .then(action(
                (res: AxiosResponse<Transaction, any>) => {
                    this.updateDailyTransactionsForDateRange(this.currentLoadedStartDate, this.currentLoadedEndDate)
                }
            ));
    }

    @action
    updateTransaction(transaction: Transaction) {
        console.log(`Updating transaction with id ${transaction.transaction_id}`);
        console.log(transaction);

        axiosRequest.put(`/transaction/${this.userStore.uid}/${transaction.transaction_id}`, transaction)
            .then(action((res: AxiosResponse<Transaction, any>) => {
                this.updateDailyTransactionsForDateRange(this.currentLoadedStartDate, this.currentLoadedEndDate)
            }));
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

        axiosRequest.get(`/tag/${this.userStore.uid}`)
            .then(action((res): AxiosResponse<Tag[], any> => this.availableTags = res.data));
    }

    @action
    updateDailyTransactionsForDateRange(startDate : dayjs.Dayjs, endDate : dayjs.Dayjs) {
        if(!this.isUpdatingDailyTransactionsData) {
            this.isUpdatingDailyTransactionsData = true;
            console.log("Updating transactions");

            axiosRequest.get(`/transaction_per_day/${this.userStore.uid}?startDate=${startDate.unix()}&endDate=${endDate.unix()}`)
                .then(action((res: AxiosResponse<DailyTransaction[], any>) => {
                    this.currentLoadedStartDate = startDate;
                    this.currentLoadedEndDate = endDate;
                    this.currentDailyTransactionsData = res.data
                    this.isUpdatingDailyTransactionsData = false;
                }));
        }
    }

    @action
    deleteTransaction(transactionId) {
        axiosRequest.delete(`/transaction/${this.userStore.uid}/${transactionId}`)
            .then(action((res: AxiosResponse<Transaction, any>) => {
                this.updateDailyTransactionsForDateRange(this.currentLoadedStartDate, this.currentLoadedEndDate)
            }));
    }
}