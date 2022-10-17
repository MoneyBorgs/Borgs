import Tag from "./Tag";

export default class Transaction {
	transaction_id!: number;
	virtual_account!: number;
	physical_account!: number;
	value!: number;
	category!: number;
	timestampEpochSeconds!: number;
	description!: String;
	notes!: String;
	tags!: Tag[];
}