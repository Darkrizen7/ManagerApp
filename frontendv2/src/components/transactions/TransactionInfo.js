import { useState } from "react";
import { EditTransactionForm } from ".";
import { approveTransaction, downloadMerged } from "lib/api";
import { PermProtect, usePerm } from "hooks/PermContext";

const TransactionInfo = (props) => {
    const { transaction, setTransaction } = props;

    const [pending, setPending] = useState(false);
    const { hasAccess } = usePerm();

    const handleApprove = async (e) => {
        if (!hasAccess("transactions.approve", transaction.list._id)) { return; }
        setPending(true);
        const { dataTransaction } = await approveTransaction(transaction._id);
        if (dataTransaction) setTransaction(dataTransaction);
        setPending(false);
    }
    const handleDownloadMerged = async (e) => {
        if (!hasAccess("transactions.approve", transaction.list._id)) { return; }
        const { error } = await downloadMerged(transaction);
    }
    const handleEdit = (transaction) => {
        setTransaction(transaction);
    }
    return (
        <>
            {transaction &&
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
                            <p>Par : {transaction.approved_by.username} à {new Date(transaction.approved_at).toLocaleString("fr-FR")}</p>
                        }
                        {!transaction.approved && hasAccess("transactions.approve", transaction.list._id) &&
                            <button onClick={handleApprove} disabled={pending}>Approuver</button>
                        }
                        <PermProtect access={"transactions.approve"} listId={transaction.list._id} noshow={true}>
                            <button onClick={handleDownloadMerged}>Télécharger le merge</button>
                        </PermProtect>
                        Créée à {transaction.created_at && new Date(transaction.created_at).toLocaleString("fr-FR")}
                        <p>{transaction.type}<br />{transaction.desc}</p>
                    </div>
                    <div>
                        <PermProtect access={"transactions.update"} listId={transaction.list._id} noshow={true}>
                            <EditTransactionForm transaction={transaction} handleEdit={handleEdit} />
                        </PermProtect>
                    </div>
                </>
            }
        </>
    );
}
export { TransactionInfo };