import { API_URL, fetchAPIWithFormData } from '.';

const fetchLists = async () => {
    const url = new URL(API_URL + "lists");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataLists: data?.lists, error }
}

const fetchList = async (_id, noPopulate = false) => {
    const url = new URL(API_URL + "lists");
    url.searchParams.append('_id', _id);
    if (noPopulate) url.searchParams.append('noPopulate', "true");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataList: data?.list, error }
}

const createList = async (formData) => {
    const url = new URL(API_URL + "lists");
    const { data, error } = await fetchAPIWithFormData(url, "post", formData);
    return { dataList: data ? data.list : null, error }
}

const deleteList = async (_id) => {
    const url = new URL(API_URL + "lists");
    const { error } = await fetchAPIWithFormData(url, "delete", { _id });
    return { error }
}
export { fetchList, fetchLists, createList, deleteList }