import { useState } from "react";
import { EditTransactionForm } from ".";
import { approveTransaction } from "lib/api";
import { ImageFetch } from "components/ImageFetch";
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
    const handleEdit = (transaction) => {
        setTransaction(transaction);
    }
    return (
        <>
            {transaction &&
                <>
                    <h1>{transaction.name}</h1>
                    <h2 style={{ color: (transaction.amount > 0) ? "green" : "red" }}>Montant :{transaction.amount}€</h2>
                    <h2 style={{ color: (transaction.approved) ? "green" : "orange" }}>{transaction.approved ? "Approuvé" : "En cours d'approbation"}</h2>
                    <p>{transaction.desc}</p>
                    <ImageFetch api_path="transactions/proof" params={{ _id: transaction._id }}></ImageFetch>
                    {!transaction.approved && hasAccess("transactions.approve", transaction.list._id) &&
                        <button onClick={handleApprove} disabled={pending}>Approuver</button>
                    }
                    {transaction.approved &&
                        <p>Transaction approuvé par : {transaction.approved_by.username} à {transaction.approved_at}</p>
                    }
                    <PermProtect access={"transactions.update"} listId={transaction.list._id} noshow={true}>
                        <EditTransactionForm transaction={transaction} handleEdit={handleEdit} />
                    </PermProtect>
                </>
            }
        </>
    );
}
export { TransactionInfo };