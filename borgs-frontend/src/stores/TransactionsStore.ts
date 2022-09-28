import { makeObservable, observable } from "mobx"
import RootStore from "./RootStore";

export default class TransactionsStore {

    @observable test = "";

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }
}