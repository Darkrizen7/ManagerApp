import { Transaction } from "primitives";
import { TransactionForm } from "./forms";
import { useState } from "react";

type IProps = {
    transaction: Transaction,
    handleApprove: (transaction: Transaction) => Promise<boolean>,
    handleDownloadMerged: (transaction: Transaction) => Promise<boolean>,
    handleEdit: (transaction: Transaction) => Promise<boolean>,
    allowEdit: boolean,
    allowApprove: boolean,
}
export const ViewTransaction = ({ transaction, handleApprove, handleDownloadMerged, handleEdit, allowEdit, allowApprove }: IProps): React.JSX.Element => {
    const [pending, setPending] = useState(false);
    return (
        <>
            <div>
                <h1>{transaction.name}</h1>
                <strong style={{ color: (transaction.amount > 0) ? "green" : "red" }}>
                    {transaction.amount}€
                </strong>
                <br />
                <strong style={{ color: (transaction.approved) ? "green" : "orange" }}>
                    {transaction.approved ? "Approuvé" : "En cours d'approbation"}
                </strong>
                {transaction.approved &&
                    <p>Par : {transaction.approved_by?.username} à {new Date(transaction.approved_at).toLocaleString("fr-FR")}</p>
                }
                {!transaction.approved && allowApprove &&
                    <button onClick={async () => { setPending(true); await handleApprove(transaction); setPending(false) }}>Approuver</button>
                }
                <button onClick={async () => { setPending(true); await handleDownloadMerged(transaction); setPending(false) }} disabled={pending}>Télécharger le merge</button>
                Créée à {transaction.created_at && new Date(transaction.created_at).toLocaleString("fr-FR")}
                <p>{transaction.type}<br />{transaction.desc}</p>
            </div>
            <div>
                {allowEdit &&
                    <TransactionForm transaction={transaction} onSubmit={handleEdit} headerText={"Modifier la transaction"} actionText={"Modifier"}></TransactionForm>
                }
                {/* <EditTransactionForm transaction={transaction} handleEdit={handleEdit} /> */}
            </div>
        </>)
}