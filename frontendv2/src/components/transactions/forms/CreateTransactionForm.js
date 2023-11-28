import { useHistory } from "react-router-dom";
import { TransactionForm } from "..";
import { createTransaction } from "lib/api";

const CreateTransactionForm = (props) => {
    const { list } = props;

    const history = useHistory();

    const handleSubmit = async (formData, setApiError) => {
        const { dataTransaction, error } = await createTransaction(formData);
        if (error) setApiError(error)
        if (dataTransaction) history.push("/transactions/get/" + dataTransaction._id);
    };

    return (
        <TransactionForm handleSubmit={handleSubmit}
            actionText="Ajouter une transaction"
            transaction={{ name: "", desc: "", amount: "", list }} />
    );
}
export { CreateTransactionForm };