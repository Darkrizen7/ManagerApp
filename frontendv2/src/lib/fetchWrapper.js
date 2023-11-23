export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    fetchImage,
};
async function fetchImage(url) {
    try {
        const res = await fetch(url, { credentials: 'include' })
        if (!res.ok) return;
        if (res.status === 201) return false;
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    } catch (e) {
    }
}
function request(method) {
    return ({ url, body, cb, requestArgs }) => {
        var myHeaders = new Headers();
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
