import { AxiosResponse } from "axios";
import { action, makeAutoObservable, observable } from "mobx"
import { axiosRequest } from "../api/api";
import User from "../model/User";
import RootStore from "./RootStore";

export default class UserStore {

    // observable variables that will be changed based on user input / account info
    // these variables will be used to keep track of the current logged in user's information
    @observable currentUserData : User[] = [];
    @observable currentUsersWithName : User[] = [];
    @observable currentUserWithEmail: User[] = [];
    @observable currentUserWithPassWord: User[] = [];
	@observable uid = 3
    @observable firstname = 'Ryan'
    @observable lastname = 'Mitchell'
    @observable email = 'rtm40@duke.edu'
    @observable password = 'ryan'
    @observable loggedInUser: boolean = false;
    @observable isRegisterModalOpen: boolean = false;
    @observable currentRegisterModal : User = new User();
    @observable emailCount = 0;
    @observable errorStatus: boolean = false;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    // opens the registration modal
    @action
    setIsRegisterModalOpen(shouldBeOpen : boolean) {
        this.isRegisterModalOpen = shouldBeOpen;
    }

    // handles request to open the registration modal
    @action
    openRegisterModal(user : User) {
        this.currentRegisterModal = user;
        this.setIsRegisterModalOpen(true);
    }

    // registers new user into the database
    @action
    createNewUser(user: User) {
        console.log(`Registering new user`);

        axiosRequest.post(`/user`, user)
            .then(action(
                (res: AxiosResponse<User, any>) => {
                    this.currentUserData.push(res.data)
                }
            ))
    }

    // finds all users with a given first name in the database
	@action
    usersWithName() {
		console.log(this.firstname);
        console.log("Updating users with first name");
		
        axiosRequest.get(`/user/${this.firstname}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUsersWithName = res.data));
    }

    // updates the value of the observable firstname variable
    @action
    updateFirstName(new_name) {
        this.firstname = new_name
		console.log(this.firstname)
		console.log(new_name)
    }

    // updates the value of the observable lastname variable
    @action
    updateLastName(new_name) {
        this.lastname = new_name
		console.log(this.lastname)
		console.log(new_name)
    }

    // retrieves all users in the database with a given email address
    @action
    userWithEmail() {
        console.log(this.email);
        console.log('Retrieving user with given email');
        axiosRequest.get(`/user/${this.email}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUserWithEmail = res.data));
    }

    // retrieves all users in the database with a given password
    @action
    userWithPassWord() {
        console.log('Current UserStore password is: ' + this.password);
        console.log('Retrieving user with given password: ' + this.password);
        axiosRequest.get(`/user/${this.email}/${this.password}`)
            .then(action((res) : AxiosResponse<User[], any> => this.currentUserWithPassWord = res.data));
    }

    // changes a user's first name and last name in the database
    @action
    changeDisplayName() {
        console.log('New first name is: ' + this.firstname);
        console.log('New last name is: ' + this.lastname);
        axiosRequest.put(`/user/${this.email}/${this.firstname}/${this.lastname}`);
    }

    // changes a user's password in the database
    @action
    changePassWord() {
        console.log('New password is: ' + this.password);
        axiosRequest.put(`/user/${this.email}/${this.password}`);
    }

    // changes the name of the observable email variable
    @action
    updateEmail(new_email) {
        this.email = new_email
        console.log(this.email)
        console.log(new_email)
    }

    // changes the value of the observable login status variable
    @action
    updateLoginStatus(new_status) {
        this.loggedInUser = new_status;
        console.log('Logged In/Out')
        console.log('New UserStore Login Status is: ' + this.loggedInUser)
    }

    // changes the value of the observable password variable
    @action
    updatePassWord(new_password) {
        this.password = new_password
        console.log('New UserStore Password is: ' + this.password)
        console.log('Submitted Password is: ' + new_password)
    }

    // changes the value of the observable uid variable
    @action
    updateUser(new_uid) {
        this.uid = new_uid
        this.rootStore.updateCache();
		console.log('New UserStore UID is: ' + this.uid)
		console.log('Submitted UID is: ' + new_uid)
    }
}