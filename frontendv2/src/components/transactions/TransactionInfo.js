import { useState } from "react";
import { EditTransactionForm } from ".";
import { approveTransaction } from "lib/api";

const TransactionInfo = (props) => {
    const { transaction, setTransaction } = props;

    const [pending, setPending] = useState(false);

    const handleApprove = async (e) => {
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
                    {!transaction.approved &&
                        <button onClick={handleApprove} disabled={pending}>Approuver</button>
                    }
                    {transaction.approved &&
                        <p>Transaction approuvé par : {transaction.approved_by.username} à {transaction.approved_at}</p>
                    }
                    <EditTransactionForm transaction={transaction} handleEdit={handleEdit} />
                </>
            }
        </>
    );
}
export { TransactionInfo };