import { Transaction } from "primitives"
import { API_RETURN_DATA } from "./api"

export interface API_RETURN_TRANSACTION extends API_RETURN_DATA {
    transaction: Transaction
}
export interface API_RETURN_TRANSACTIONS extends API_RETURN_DATA {
    transactions: Transaction[],
}