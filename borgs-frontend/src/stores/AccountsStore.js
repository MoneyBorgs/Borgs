import { makeAutoObservable } from "mobx"

export default class AccountsStore {
	rootStore;

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}