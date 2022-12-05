import dayjs from 'dayjs';
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
		this.accountsStore = new AccountsStore(this);
		this.allocationsStore = new AllocationsStore(this);
		this.dashboardStore = new DashboardStore(this);
		this.reportsStore = new ReportsStore(this);
		this.transactionsStore = new TransactionsStore(this);

		// Cache initial results
		this.updateCache();
	}

	updateCache() {
		this.transactionsStore.updateAvailableCategories(false);
		this.transactionsStore.updateAvailableTags();
		this.accountsStore.updateVirtualAccounts();
		this.accountsStore.updatePhysicalAccounts();
		this.dashboardStore.updateBalance();
		this.dashboardStore.updateTotalBalance();
		this.dashboardStore.updateTopCategories();
		this.dashboardStore.updateIncomesExpenses();
		this.transactionsStore.updateDailyTransactionsForDateRange(dayjs().startOf("month"), dayjs().endOf("month"));
		this.reportsStore.updateReportsData();
	}
}