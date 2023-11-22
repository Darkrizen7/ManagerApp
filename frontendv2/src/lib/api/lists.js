import { API_URL, fetchAPIWithFormData } from '.';

const fetchLists = async () => {
    const url = new URL(API_URL + "lists");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataLists: data.lists ? data.lists : null, error }
}

const fetchList = async (_id) => {
    const url = new URL(API_URL + "lists");
    url.searchParams.append('_id', _id);
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataList: data.list ? data.list : null, error }
}

const createList = async (formData) => {
    const url = new URL(API_URL + "lists");
    const { data, error } = await fetchAPIWithFormData(url, "post", formData);
    return { dataLists: data.lists ? data.lists : null, error }
}

const deleteList = async (_id) => {
    const url = new URL(API_URL + "lists");
    const { data, error } = await fetchAPIWithFormData(url, "delete", { _id });
    return { dataLists: data.lists ? data.lists : null, error }
}
export { fetchList, fetchLists, createList, deleteList }