import { Transaction } from "interfaces";

class Invoice extends Transaction {
    amount_HT: number;
    toReimburse: string;
    RIB: File;
    invoice: File;
    expense_report: File;
}
export { Invoice };