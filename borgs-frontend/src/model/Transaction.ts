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
	from_transfer_transaction!: number;
	to_transfer_transaction!: number;
}