import { useState } from "react";
import { fetchWrapper } from "lib/fetchWrapper";
const TransactionInfo = (props) => {
    const { transaction, setTransaction } = props;
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const handleApprove = async (e) => {
        setPending(true);
        const body = { transactionId: transaction._id };
        const url = "http://localhost:3000/transactions/approve";
        const res = await fetchWrapper.put({ url, body });
        const data = await res.json();
        if (!res.ok || !data.success) {
            console.log(data);
            return;
        }
        setTransaction(data.transaction);
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
                        <button onClick={handleApprove} disable={pending}>Approuver</button>
                    }
                    {transaction.approved &&
                        <p>Transaction approuvé par : {transaction.approved_by.username} à {transaction.approved_at}</p>
                    }
                </>
            }
        </>
    );
}
export { TransactionInfo };