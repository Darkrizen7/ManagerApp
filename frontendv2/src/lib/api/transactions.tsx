import { ITransaction } from 'interfaces';
import { API_URL, fetchAPIWithData, createFormDataAndURL, fetchAPIWithFormData, fetchFile } from '.';

const fetchTransactions = async (list) => {
    const url = new URL(API_URL + "transactions");
    if (list) url.searchParams.append("list", list);
    const { data, error } = await fetchAPIWithFormData(url, "get");
    let dataTransactions: ITransaction[] = data?.transactions;
    return { dataTransactions, error }
}

const fetchTransaction = async (_id) => {
    const url = new URL(API_URL + "transactions");
    url.searchParams.append('_id', _id);
    const { data, error } = await fetchAPIWithFormData(url, "get");
    let dataTransaction: ITransaction = data?.transaction;
    return { dataTransaction, error }
}

const removeTransaction = async (_id) => {
    const url = new URL(API_URL + "transactions");
    const { error } = await fetchAPIWithFormData(url, "delete", { _id });
    if (!error) return true
    return error;
}

const approveTransaction = async (_id) => {
    const url = new URL(API_URL + "transactions/approve");
    const { data, error } = await fetchAPIWithFormData(url, "put", { _id });
    let dataTransaction: ITransaction = data?.transaction;
    return { dataTransaction, error };
}

const updateTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);

    if (formData.proof) fData.set("proof", formData.proof[0]);
    if (formData.contract) fData.set("contract", formData.contract[0]);
    if (formData.RIB) fData.set("RIB", formData.RIB[0]);
    if (formData.facture) fData.set("facture", formData.facture[0]);
    if (formData.frais) fData.set("frais", formData.frais[0]);

    const { data, error } = await fetchAPIWithFormData(url, "put", fData);
    let dataTransaction: ITransaction = data?.transaction;
    return { dataTransaction, error };
}

const createTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);

    if (formData.proof) fData.set("proof", formData.proof[0]);
    if (formData.contract) fData.set("contract", formData.contract[0]);
    if (formData.RIB) fData.set("RIB", formData.RIB[0]);
    if (formData.facture) fData.set("facture", formData.facture[0]);
    if (formData.frais) fData.set("frais", formData.frais[0]);

    const { data, error } = await fetchAPIWithFormData(url, "post", fData);
    let dataTransaction: ITransaction = data?.transaction;
    return { dataTransaction, error };
}

const downloadMerged = async (transaction: ITransaction) => {
    const url = new URL(API_URL + "transactions/download");
    if (transaction) url.searchParams.append("_id", transaction._id);
    const { error } = await fetchFile(url, "merged.pdf");
    return { error }
}
export {
    fetchTransaction, fetchTransactions, removeTransaction,
    approveTransaction, updateTransaction, createTransaction,
    downloadMerged
}