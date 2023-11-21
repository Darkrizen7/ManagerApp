export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

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
            myHeaders.append('Content-Type', 'application/json');
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions);
    }
}