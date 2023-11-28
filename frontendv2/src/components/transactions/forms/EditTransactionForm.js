import { TransactionForm } from "..";
import { updateTransaction } from "lib/api";

const EditTransactionForm = (props) => {
    const { transaction, handleEdit } = props;

    const handleSubmit = async (formData, setApiError) => {
        const { dataTransaction, error } = await updateTransaction(formData);
        if (error) setApiError(error)
        if (dataTransaction) handleEdit(dataTransaction);
    };
    return (
        <TransactionForm handleSubmit={handleSubmit}
            actionText="Modifier la transaction"
            transaction={transaction} />
    );
}
export { EditTransactionForm };