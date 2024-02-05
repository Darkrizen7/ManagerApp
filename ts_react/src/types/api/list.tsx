import { List } from "primitives"
import { API_RETURN_DATA } from "./api"

export interface ListData extends FormData {
    campagne: string;
    name: string;
}
export interface API_RETURN_LISTS extends API_RETURN_DATA {
    lists: List[]
}
export interface API_RETURN_LIST extends API_RETURN_DATA {
    list: List,
}