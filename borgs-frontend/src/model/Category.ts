export default class Category {
	category_id!: number
	displayname!: string
	user_id!: number
	category_type!: CategoryType
	children!: Category[] | null
}

export class CategoryType {
	public static readonly EXPENSE = new CategoryType("EXPENSE", "Expense");
	public static readonly INCOME = new CategoryType("INCOME", "Income");
	public static readonly TRANSFER = new CategoryType("TRANSFER", "Transfer")

	private constructor(public readonly typeId: string, public readonly displayName: string) {}
}