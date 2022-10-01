import { makeAutoObservable } from "mobx"
import RootStore from "./RootStore";

export default class ReportsStore {
	rootStore : RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}