import { Member } from "primitives"
import { API_RETURN_DATA } from "./api"

export interface API_RETURN_MEMBER extends API_RETURN_DATA {
    member: Member
}
export interface API_RETURN_MEMBERS extends API_RETURN_DATA {
    members: Member[],
}