import { List } from "primitives";

export class Member {
    public _id: string = "-1";
    public support: boolean = false;
    public list: List | undefined = undefined;
    public surname: string = "";
    public lastname: string = "";
    public email: string = "";
    public student_number: string = "0000";
    public new_password: string | null = "";
    public role: ("" | "RCorpo" | "RDem" | "Treso" | "Hygiène" | "Comm" | "RSE") = "";
    constructor(data: Partial<Member>) {
        Object.assign(this, data);
    }
}