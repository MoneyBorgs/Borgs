import { AxiosResponse } from "axios";
import { action, makeAutoObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import User from "../model/User";
import RootStore from "./RootStore";

export default class UserStore {

    @observable currentUserData : User[] = [];
    @observable currentUsersWithName : User[] = [];
    @observable currentUserWithEmail: User[] = [];
    @observable currentUserWithPassWord: User[] = [];
	@observable uid = 3
    @observable firstname = 'Ryan'
    @observable email = 'rtm40@duke.edu'
    @observable password = 'ryan'
    @observable loggedInUser: boolean = false;
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
    userWithEmail() {
        console.log(this.email);
        console.log('Retrieving user with given email');
        axiosRequest.get(`/user/${this.email}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUserWithEmail = res.data));
    }

    @action
    userWithPassWord() {
        console.log('Current UserStore password is: ' + this.password);
        console.log('Retrieving user with given password: ' + this.password);
        axiosRequest.get(`/user/${this.email}/${this.password}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUserWithPassWord = res.data));
    }


    @action
    updateEmail(new_email) {
        this.email = new_email
        console.log(this.email)
        console.log(new_email)
    }

    @action
    updateLoginStatus(new_status) {
        this.loggedInUser = new_status;
        console.log('Logged In/Out')
        console.log('New UserStore Login Status is: ' + this.loggedInUser)
    }

    @action
    updatePassWord(new_password) {
        this.password = new_password
        console.log('New UserStore Password is: ' + this.password)
        console.log('Submitted Password is: ' + new_password)
    }

    @action
    updateUser(new_uid) {
        this.uid = new_uid
        this.rootStore.updateCache();
		console.log('New UserStore UID is: ' + this.uid)
		console.log('Submitted UID is: ' + new_uid)
    }
}