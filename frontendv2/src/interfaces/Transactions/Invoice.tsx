import { Transaction } from "interfaces";

interface Invoice extends Transaction {
    toReimburse: string;
    RIB: File;
    invoice: File;
    expense_report: File;
}
export { Invoice };