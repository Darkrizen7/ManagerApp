import { Transaction } from "primitives";
import { API_RETURN, API_RETURN_FILE, API_RETURN_TRANSACTION, API_RETURN_TRANSACTIONS } from "types";
import { API_Req, fetchFile } from "./fetchWrapper";

import { API_URL } from "config";
const BASE_API_URL = API_URL + "transactions/";

export async function API_GetTransaction(_id: string | undefined): Promise<API_RETURN<API_RETURN_TRANSACTION>> {
    return API_Req<API_RETURN_TRANSACTION>(BASE_API_URL + "", "get", null, (url) => {
        if (_id) url.searchParams.append('_id', _id);
        return url;
    })
}

export async function API_GetTransactions(list_id?: string): Promise<API_RETURN<API_RETURN_TRANSACTIONS>> {
    return API_Req<API_RETURN_TRANSACTIONS>(BASE_API_URL + "", "get", null, (url) => {
        if (list_id) url.searchParams.append('list', list_id);
        return url
    })
}

export async function API_RemoveTransaction(transaction: Transaction): Promise<API_RETURN<void>> {
    return API_Req<void>(BASE_API_URL + "", "delete", { _id: transaction._id });
}

export async function API_UpdateTransaction(transaction: Transaction): Promise<API_RETURN<API_RETURN_TRANSACTION>> {
    return API_Req<API_RETURN_TRANSACTION>(BASE_API_URL + "", "put", transaction);
}

export async function API_CreateTransaction(transaction: Transaction): Promise<API_RETURN<API_RETURN_TRANSACTION>> {
    return API_Req<API_RETURN_TRANSACTION>(BASE_API_URL + "", "post", transaction);
}

export async function API_ApproveTransaction(transaction: Transaction): Promise<API_RETURN<API_RETURN_TRANSACTION>> {
    return API_Req<API_RETURN_TRANSACTION>(BASE_API_URL + "approve", "put", transaction);
}

export async function API_DownloadMergedTransaction(transaction: Transaction): Promise<API_RETURN<API_RETURN_FILE>> {
    const url = new URL(BASE_API_URL + "download");
    if (transaction) url.searchParams.append("_id", transaction._id);
    const { error } = await fetchFile(url);
    return { error }
}