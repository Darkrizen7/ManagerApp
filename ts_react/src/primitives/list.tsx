import { Member, Transaction } from "primitives";

export class List {
    public _id: string = "-1";
    public members: Member[] = [];
    public transactions: Transaction[] = [];
    public name: string = "";
    public pre_name: string = "";
    public campagne: ("BDE" | "BDA" | "Ski Club" | "Petit Paumé") = "BDE";
    constructor(data: Partial<List>) {
        Object.assign(this, data);
    }
    toString(): string {
        return this._id;
    }
}