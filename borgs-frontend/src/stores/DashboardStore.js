import { makeAutoObservable } from "mobx"

export default class DashboardStore {
	rootStore;

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}