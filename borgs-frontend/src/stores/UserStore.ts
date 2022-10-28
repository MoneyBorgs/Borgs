import { AxiosResponse } from "axios";
import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import User from "../model/User";
import RootStore from "./RootStore";

export default class UserStore {

    @observable currentUserData : User[] = [];
    @observable currentUsersWithName : User[] = [];
	@observable uid = 1
    @observable firstname = 'Ryan'

    @observable isRegisterModalOpen: boolean = false;
    @observable currentRegisterModal : User = new User();

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
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
    usersWithName() {
		console.log(this.firstname);
        console.log("Updating users with first name");
		
        axiosRequest.get(`/user/${this.firstname}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUsersWithName = res.data));
    }

    @action
    updateFirstName(new_name) {
        this.firstname = new_name
		console.log(this.firstname)
		console.log(new_name)
    }

    @action
    updateUser(new_uid) {
        this.uid = new_uid
		console.log(this.uid)
		console.log(new_uid)
    }
}