import { API_URL, fetchAPIWithData, createFormDataAndURL, fetchAPIWithFormData } from '.';

const fetchTransactions = async (list) => {
    const url = new URL(API_URL + "transactions");
    if (list) url.searchParams.append("list", list);
    const { data, error } = await fetchAPIWithFormData(url, "get");
    return { dataTransactions: data.transactions ? data.transactions : null, error }
}

const fetchTransaction = async (_id) => {
    const url = new URL(API_URL + "transactions");
    url.searchParams.append('_id', _id);
    const { data, error } = await fetchAPIWithFormData(url, "get");
    return { dataTransaction: data.transaction ? data.transaction : null, error }
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
    return { dataTransaction: data.transaction ? data.transaction : null, error };
}

const updateTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);
    fData.set("file", formData.file[0]);
    const { data, error } = await fetchAPIWithFormData(url, "put", fData);
    return { dataTransaction: data.transaction ? data.transaction : null, error };
}

const createTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);
    fData.set("file", formData.file[0]);
    const { data, error } = await fetchAPIWithFormData(url, "post", fData);
    return { dataTransaction: data.transaction, error };
}
export { fetchTransaction, fetchTransactions, removeTransaction, approveTransaction, updateTransaction, createTransaction }