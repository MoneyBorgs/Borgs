export default class Category {
	category_id!: number
	displayname!: string
	user_id!: number
	category_type!: CategoryTypes
	children!: Category[] | null
}

export class CategoryTypes extends String {
	public static readonly EXPENSE = "EXPENSE"
	public static readonly INCOME = "INCOME"
	public static readonly TRANSFER = "TRANSFER"
}