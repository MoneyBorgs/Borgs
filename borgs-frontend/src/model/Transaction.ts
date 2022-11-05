import Tag from "./Tag";
import Category from "./Category";

export default class Transaction {
	transaction_id!: number;
	virtual_account!: number;
	physical_account!: number;
	value!: number;
	category!: Category;
	timestampepochseconds!: number;
	description!: String;
	notes!: String;
	tags!: Tag[];

	static getDefaultTransaction() : Transaction {
		const t = new Transaction();
		return t;
	}

	// clone() {
	// 	let t = new Transaction();
	// 	t.transaction_id = this.transaction_id;
	// 	t.virtual_account = this.virtual_account;
	// 	t.physical_account = this.physical_account;
	// 	t.value = this.value;
	// 	t.category = this.category;
	// 	timestampEpochSeconds!: number;
	// 	description!: String;
	// 	notes!: String;
	// 	tags!: Tag[];
	//
	//
	// 	return undefined;
	// }
}