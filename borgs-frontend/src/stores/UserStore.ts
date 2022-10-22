import { makeAutoObservable, observable } from "mobx"
import RootStore from "./RootStore";

export default class ReportsStore {
	rootStore: RootStore;

	@observable uid = 5;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}