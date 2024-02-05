import { fetchWrapper } from "lib/fetchWrapper.js";

export * from "./lists.js"
export * from "./members.js"
export * from "./transactions"

const API_URL = "5.196.13.247:3000";

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

const fetchFile = async (url) => {
    try {
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) return { error: { message: "Erreur interne" } }

        const contentType = res.headers.get('Content-Type');
        if (contentType.includes('application/json')) {
            const data = await res.json();
            return data;
        }
        const blob = await res.blob();

        const contentDisposition = res.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition && contentDisposition.includes('filename');
        const filename = filenameMatch ? contentDisposition.split('"')[1] : 'downloaded_file';

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return {};
    } catch (error) { return { error } }
}
export { API_URL, fetchAPIWithData, createFormDataAndURL, fetchAPIWithFormData, fetchFile }