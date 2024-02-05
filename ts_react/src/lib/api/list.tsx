import { API_RETURN, ListData } from "types/api";
import { API_Req } from "./fetchWrapper";
import { API_RETURN_LIST, API_RETURN_LISTS } from "types";
import { List } from "primitives";

const API_URL = "http://localhost:3000/";
const BASE_API_URL = API_URL + "lists/";

export async function API_GetLists(): Promise<API_RETURN<API_RETURN_LISTS>> {
    return API_Req<API_RETURN_LISTS>(BASE_API_URL + "", "get");
}

export async function API_GetList(_id: string | undefined, noPopulate?: boolean): Promise<API_RETURN<API_RETURN_LIST>> {
    return API_Req<API_RETURN_LIST>(BASE_API_URL + "", "get", null, (url: URL) => {
        if (_id) url.searchParams.append('_id', _id);
        if (noPopulate) url.searchParams.append('noPopulate', "true");
        return url
    });
}

export async function API_CreateList(listData: ListData): Promise<API_RETURN<API_RETURN_LIST>> {
    return API_Req<API_RETURN_LIST>(BASE_API_URL + "", "post", listData);
}

export async function API_DeleteList(list: List): Promise<API_RETURN<void>> {
    return API_Req<void>(BASE_API_URL + "", "delete", list)
}

export async function API_UpdateList(list: List): Promise<API_RETURN<API_RETURN_LIST>> {
    return API_Req<API_RETURN_LIST>(BASE_API_URL + "", "put", list);
}