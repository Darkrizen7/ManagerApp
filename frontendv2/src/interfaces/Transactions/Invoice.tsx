import { ITransaction } from "interfaces";

class IInvoice extends ITransaction {
    amount_HT: number;
    toReimburse: string;
    RIB: File;
    invoice: File;
    expense_report: File;
}
export { IInvoice };