import AccountsStore from './AccountsStore';
import AllocationsStore from './AllocationsStore';
import DashboardStore from './DashboardStore';
import ReportsStore from './ReportsStore';
import TransactionsStore from './TransactionsStore';

export default class RootStore {
	constructor() {
		this.transactionsStore = new TransactionsStore(this);
		this.accountsStore = new AccountsStore(this);
		this.allocationsStore = new AllocationsStore(this);
		this.dashboardStore = new DashboardStore(this);
		this.reportsStore = new ReportsStore(this);
	}
}