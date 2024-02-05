import { API_RETURN } from "types";
import { API_RETURN_MEMBER, API_RETURN_MEMBERS } from "types/api";
import { API_Req } from "./fetchWrapper";
import { Member } from "primitives";

import { API_URL } from "config";
const BASE_API_URL = API_URL + "members/";
export async function API_CreateMember(member: Member): Promise<API_RETURN<API_RETURN_MEMBER>> {
    return API_Req<API_RETURN_MEMBER>(BASE_API_URL + "", "post", member);
}
export async function API_EditMember(member: Member): Promise<API_RETURN<API_RETURN_MEMBER>> {
    return API_Req<API_RETURN_MEMBER>(BASE_API_URL + "", "put", member);
}
export async function API_RemoveMember(member: Member): Promise<API_RETURN<void>> {
    return API_Req<void>(BASE_API_URL + "", "delete", member);
}
export async function API_GetMemberForCurrentUser(): Promise<API_RETURN<API_RETURN_MEMBER>> {
    return API_Req<API_RETURN_MEMBER>(BASE_API_URL + "user", "get");
}
export async function API_GetMembers(): Promise<API_RETURN<API_RETURN_MEMBERS>> {
    return API_Req<API_RETURN_MEMBERS>(BASE_API_URL, "get");
}