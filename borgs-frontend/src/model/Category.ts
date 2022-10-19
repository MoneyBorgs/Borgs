export default class Category {
	category_id!: number
	displayname!: string
	user_id!: number
	category_type!: CategoryType
	children!: Category[] | null
}

enum CategoryType {
	EXPENSE = "EXPENSE",
	INCOME = "INCOME",
	TRANSFER = "TRANSFER"
}