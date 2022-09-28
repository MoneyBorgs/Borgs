import { makeAutoObservable } from "mobx"

export default class TransactionsStore {

    test = "";

    rootStore;

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }
}