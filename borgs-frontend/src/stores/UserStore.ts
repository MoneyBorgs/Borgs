import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import User from "../model/User";
import RootStore from "./RootStore";

export default class UserStore {

    @observable currentUserData : User[] = [];

	@observable uid = 1

    @observable isRegisterModalOpen: boolean = false;
    @observable currentRegisterModal : User = new User();

    rootStore: RootStore;
    userStore : UserStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.userStore = this.rootStore.userStore;
    }

    @action
    setIsRegisterModalOpen(shouldBeOpen : boolean) {
        this.isRegisterModalOpen = shouldBeOpen;
    }

    @action
    openRegisterModal(user : User) {
        this.currentRegisterModal = user;
        this.setIsRegisterModalOpen(true);
    }

    @action
    createNewUser(user: User) {
        console.log(`Registering new user`);

        axiosRequest.post(`/user`, user)
            .then(action(
                (res: AxiosResponse<User, any>) => {
                    this.currentUserData.push(res.data)
                }
            ));
    }

    @action
    updateUser(new_uid) {
        this.uid = new_uid
		console.log(this.uid)
		console.log(new_uid)
    }
}