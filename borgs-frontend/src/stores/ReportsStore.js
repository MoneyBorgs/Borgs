import { makeAutoObservable } from "mobx"

export default class ReportsStore {
	rootStore;

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}