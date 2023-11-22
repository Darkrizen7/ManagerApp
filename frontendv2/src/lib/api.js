import { fetchWrapper } from 'lib/fetchWrapper';

const API_URL = "http://localhost:3000/";

const fetchMembers = async (list) => {
    const url = new URL(API_URL + "members");

    const res = await fetchWrapper.get({ url })
    const data = await res.json();

    if (!res.ok || !data.success) {
        const { error } = data
        return { error };
    }
    return { dataMembers: data.members }
};

const fetchLists = async () => {
    const url = new URL(API_URL + "lists");

    const res = await fetchWrapper.get({ url });
    const data = await res.json();

    if (!res.ok || !data.success) {
        const { error } = data;
        return { error };
    }
    return { dataLists: data.lists }
}

const fetchList = async (_id) => {
    const url = new URL(API_URL + "lists");
    url.searchParams.append('_id', _id);

    const res = await fetchWrapper.get({ url });
    const data = await res.json();

    if (!res.ok || !data.success) {
        const { error } = data;
        return { error };
    }

    return { dataList: data.list }
}

const fetchTransactions = async (list) => {
    const url = new URL(API_URL + "transactions");
    if (list) url.searchParams.append("list", list);

    const res = await fetchWrapper.get({ url });
    const data = await res.json();

    if (!res.ok || !data.success) {
        const { error } = data;
        return { error };
    }
    return { dataTransactions: data.transactions }
}

const fetchTransaction = async (_id) => {
    const url = new URL(API_URL + "transactions");
    url.searchParams.append('_id', _id);

    const res = await fetchWrapper.get({ url });
    const data = await res.json();

    if (!res.ok || !data.success) {
        const { error } = data;
        return { error };
    }

    return { dataTransaction: data.transaction }
}
export { fetchMembers, fetchLists, fetchList, fetchTransaction, fetchTransactions };