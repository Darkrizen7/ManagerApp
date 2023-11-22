import { useHistory } from "react-router-dom";
import { TransactionForm } from ".";
import { createTransaction } from "lib/api";

const CreateTransactionForm = (props) => {
    const { list } = props;

    const history = useHistory();

    const handleSubmit = async (formData) => {
        const { dataTransaction } = await createTransaction(formData);
        if (dataTransaction) history.push("/transactions/get/" + dataTransaction._id);
    };
    return (
        <TransactionForm handleSubmit={handleSubmit}
            actionText="Ajouter une transaction"
            transaction={{ name: "", desc: "", amount: "", list }} />
    );
}
export { CreateTransactionForm };