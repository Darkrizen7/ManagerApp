import { fetchWrapper } from "lib/fetchWrapper.js";

export * from "./lists.js"
export * from "./members.js"
export * from "./transactions"

const API_URL = "http://localhost:3000/";

const createFormDataAndURL = (url_path, formData) => {
    const url = new URL(API_URL + url_path);
    const fData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        fData.append(key, value);
    });
    return { url, fData };
}
const fetchAPIWithFormData = async (url, method, fData) => {
    const body = fData;
    const res = await fetchWrapper[method]({ url, body });
    const data = await res.json();
    if (!res.ok || !data.success) {
        const { error } = data;
        return { error };
    }
    return { data };
}
const fetchAPIWithData = async (url_path, method, formData) => {
    const { url, fData } = createFormDataAndURL(url_path, formData);
    const { data, error } = await fetchAPIWithFormData(url, method, fData);
    return { data, error }
}
export { API_URL, fetchAPIWithData, createFormDataAndURL, fetchAPIWithFormData }