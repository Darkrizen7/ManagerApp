import { Member } from "primitives";

export class User {
    public _id: string = "-1";
    public email: string = "N/A";
    public username: string = "N/A";
    public role: string = "";
    public member: Member | null = null;
    public password: string = "";
    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}