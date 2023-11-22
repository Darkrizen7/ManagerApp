import { useState } from "react";
import { fetchWrapper } from "lib/fetchWrapper";
import { useHistory } from "react-router-dom";

import { TransactionForm } from ".";

const EditTransactionForm = (props) => {
    const { transaction, handleEdit } = props;

    const history = useHistory();

    const handleSubmit = async (formData, setError, setPending) => {
        setPending(true);
        const body = formData;
        formData._id = transaction._id;
        const url = "http://localhost:3000/transactions";
        const res = await fetchWrapper.put({ url, body });
        const data = await res.json();
        if (!res.ok || !data.success) {
            setError(data.message);
            setPending(false);
            return;
        }
        handleEdit(data.transaction);
        setPending(false);
    };
    return (
        <TransactionForm handleSubmit={handleSubmit}
            actionText="Modifier la transaction"
            transaction={transaction} />
    );
}
export { EditTransactionForm };