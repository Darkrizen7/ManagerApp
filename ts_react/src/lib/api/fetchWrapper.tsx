import { API_RETURN, API_RETURN_FILE } from "types";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
}

function request(method: string) {
    return ({ url, body, requestArgs }: { url: URL, body?: FormData | Object, requestArgs?: any }) => {
        const myHeaders = new Headers();
        const requestOptions = {
            method,
            headers: myHeaders,
            credentials: 'include',
            ...requestArgs,
        };
        if (body) {
            if (body instanceof FormData) {
                requestOptions.body = body
            } else {
                myHeaders.append('Content-Type', 'application/json');
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions);
    }
}

export async function API_Req<T>(destURL: string, method: "get" | "put" | "post" | "delete", body?: any, urlMod?: (url: URL) => URL): Promise<API_RETURN<T>> {
    var url = new URL(destURL);
    if (urlMod) url = urlMod(url);
    var fData: Object | FormData | undefined = undefined;
    if (body) {
        fData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            if (fData && fData instanceof FormData) {
                var vl = value as (string | Blob);
                if (value instanceof Object && "_id" in value) vl = (value._id as string);
                fData.append(key, vl);
                if (value instanceof FileList) {
                    fData.set(key, body[key][0]);
                }
            }
        });
    }
    if (method === "delete") fData = body;
    const res = await fetchWrapper[method]({ url, body: fData, })
    const tempData = await res.json();
    if (!res.ok || !tempData.success) {
        return { error: new Error(tempData?.error?.message) }
    }
    return { data: tempData as T };
}

export async function fetchFile(url: URL): Promise<API_RETURN<API_RETURN_FILE>> {
    try {
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) return { error: new Error("Erreur interne") }

        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
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
    } catch (error: any) { return { error: new Error(error?.message) } }
} 