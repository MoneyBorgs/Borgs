import Transaction from "./Transaction";
import _ from "lodash";

/**
 * Extends the default interface of a Transaction by also specifying a target physical/virtual accounts,
 * as well as the sister transfer transaction
 */
export default class TransferTransaction extends Transaction {
    to_virtual_account!: number;
    to_physical_account!: number;
    from_transfer_transaction!: number;
    to_transfer_transaction!: number;
}

export function getFromAccountTransaction(originalTransaction : TransferTransaction) : TransferTransaction {
    const t = _.cloneDeep(originalTransaction);
    t.value = -t.value;

    return t;
}

export function getToAccountTransaction(originalTransaction : TransferTransaction) : TransferTransaction {
    const t = _.cloneDeep(originalTransaction);

    t.virtual_account = t.to_virtual_account;
    t.physical_account = t.to_physical_account;

    return t;
}

export function getToTransactionFromFromTransaction(originalTransaction : TransferTransaction) {
    const t = _.cloneDeep(originalTransaction);

    t.transaction_id = t.to_transfer_transaction;
    t.virtual_account = t.to_virtual_account;
    t.physical_account = t.to_physical_account;
    t.value = -t.value;

    return t;
}

export function getFromTransactionFromToTransaction(originalTransaction : TransferTransaction) {
    const t = _.cloneDeep(originalTransaction);

    t.transaction_id = t.from_transfer_transaction;
    t.virtual_account = t.from_virtual_account;
    t.physical_account = t.from_physical_account;
    t.value = -t.value;

    return t;
}