import { makeAutoObservable } from "mobx"

export default class AllocationsStore {
	rootStore;

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}