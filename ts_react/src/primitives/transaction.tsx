import { List } from "./list";
import { User } from "./user";

export class Transaction {
    public _id: string = "-1";
    public name: string = "";
    public desc: string = "";
    public amount: number = 0;
    public amount_ht?: number = 0;
    public toreimburse?: string = "";
    public type: string = "";
    public date: string = new Date(Date.now()).toISOString().split('T')[0];
    public created_at: string = new Date(Date.now()).toISOString().split('T')[0];
    public approved: boolean = false;
    public approved_by: User | undefined = undefined;
    public approved_at: string = new Date(Date.now()).toISOString().split('T')[0];
    public user: User | undefined = undefined;
    public list: List | undefined = undefined;
    public RIB?: File;
    public facture?: File;
    public frais?: File;
    public proof?: File;
    public contract?: File;
    public get list_id() {
        if (this.list instanceof List) return this.list._id;
        return this.list;
    }
    constructor(data: Partial<Transaction>) {
        Object.assign(this, data);
    }
}