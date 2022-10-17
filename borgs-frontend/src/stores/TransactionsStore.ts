import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import RootStore from "./RootStore";

export default class TransactionsStore {

    @observable isNewExpenseModalOpen : boolean = false;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    // @action
    setNewExpenseModalState(shouldBeOpen : boolean) {
        this.isNewExpenseModalOpen = shouldBeOpen;
    }
    
    // getSomeRandomStuffFromAPI() {
    //     axiosRequest.get('/todos/1')
    //         .then(action((res) => this.test = res.data.title))
    //         .catch(err => console.log(err))
    // }
}