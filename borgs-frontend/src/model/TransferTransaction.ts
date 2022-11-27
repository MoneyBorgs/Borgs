import Transaction from "./Transaction";
import _ from "lodash";

/**
 * Extends the default interface of a Transaction by also specifying a target physical/virtual accounts,
 * as well as the sister transfer transaction
 */
export default class TransferTransaction extends Transaction {
    to_virtual_account!: number;
    to_physical_account!: number;
    sister_transfer_transaction!: number;
}