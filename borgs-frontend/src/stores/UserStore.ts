import { makeAutoObservable, observable } from "mobx"
import RootStore from "./RootStore";

export default class UserStore {
	rootStore: RootStore;

	@observable uid = 1;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}