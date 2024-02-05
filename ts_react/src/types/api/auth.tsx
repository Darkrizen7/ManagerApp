import { User } from "primitives";
import { API_RETURN_DATA } from "./api";

export interface API_RETURN_LOGIN extends API_RETURN_DATA {
    user: User,
    token: string,
}
export interface API_RETURN_TOKEN_LOGIN extends API_RETURN_DATA {
    user: User,
}