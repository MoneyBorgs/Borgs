import AccountsStore from './AccountsStore';
import AllocationsStore from './AllocationsStore';
import DashboardStore from './DashboardStore';
import ReportsStore from './ReportsStore';
import TransactionsStore from './TransactionsStore';
import UserStore from './UserStore';

export default class RootStore {
	transactionsStore: TransactionsStore;
	accountsStore: AccountsStore;
	allocationsStore: AllocationsStore;
	dashboardStore: DashboardStore;
	reportsStore: ReportsStore;
	userStore: UserStore;
	constructor() {
		this.userStore = new UserStore(this);
		this.transactionsStore = new TransactionsStore(this);
		this.accountsStore = new AccountsStore(this);
		this.allocationsStore = new AllocationsStore(this);
		this.dashboardStore = new DashboardStore(this);
		this.reportsStore = new ReportsStore(this);
		this.userStore = new UserStore(this);
	}
}