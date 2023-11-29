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
    return { dataTransaction: data ? data.transaction : null, error };
}

const updateTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);
    if (formData.proof) fData.set("proof", formData.proof[0]);
    if (formData.contract) fData.set("contract", formData.contract[0]);
    if (formData.RIB) fData.set("RIB", formData.RIB[0]);
    if (formData.facture) fData.set("facture", formData.facture[0]);
    if (formData.frais) fData.set("frais", formData.frais[0]);
    const { data, error } = await fetchAPIWithFormData(url, "put", fData);
    return { dataTransaction: data ? data.transaction : null, error };
}

const createTransaction = async (formData) => {
    const { url, fData } = createFormDataAndURL("transactions", formData);
    if (formData.proof) fData.set("proof", formData.proof[0]);
    if (formData.contract) fData.set("contract", formData.contract[0]);
    if (formData.RIB) fData.set("RIB", formData.RIB[0]);
    if (formData.facture) fData.set("facture", formData.facture[0]);
    if (formData.frais) fData.set("frais", formData.frais[0]);
    const { data, error } = await fetchAPIWithFormData(url, "post", fData);
    return { dataTransaction: data ? data.transaction : null, error };
}
export { fetchTransaction, fetchTransactions, removeTransaction, approveTransaction, updateTransaction, createTransaction }