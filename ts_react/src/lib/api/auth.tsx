import { API_RETURN, API_RETURN_LOGIN, API_RETURN_TOKEN_LOGIN } from "types";
import { fetchWrapper } from "./fetchWrapper";
import { User } from "primitives";

const API_URL = "http://localhost:3000/";
const BASE_API_URL = API_URL + "auth/";

export async function API_Login(userData: User): Promise<API_RETURN<API_RETURN_LOGIN>> {
    const url = new URL(BASE_API_URL + "login");
    const res = await fetchWrapper.post({ url, body: userData });
    const tempData = await res.json();
    if (!res.ok || !tempData.success) {
        return { error: new Error(tempData?.error?.message) }
    }
    return { data: tempData as API_RETURN_LOGIN }
}
export async function API_TokenLogin(token: string): Promise<API_RETURN<API_RETURN_TOKEN_LOGIN>> {
    const url = new URL(BASE_API_URL + "checkToken");
    const res = await fetchWrapper.post({
        url,
        body: { token }
    });
    const tempData = await res.json();
    if (!res.ok || !tempData.success) {
        return { error: new Error(tempData?.error?.message) }
    }
    return { data: tempData as API_RETURN_TOKEN_LOGIN }
}