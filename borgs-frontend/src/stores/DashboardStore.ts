import { makeAutoObservable } from "mobx"
import RootStore from "./RootStore";

export default class DashboardStore {
	rootStore: RootStore;

	constructor(rootStore) {
		makeAutoObservable(this, { rootStore: false });
		this.rootStore = rootStore;
	}
}