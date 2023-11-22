import { fetchWrapper } from "lib/fetchWrapper";
import { useHistory } from "react-router-dom";
import { TransactionForm } from ".";

const CreateTransactionForm = (props) => {
    const { list } = props;

    const history = useHistory();

    const handleSubmit = async (formData, setError, setPending) => {
        setPending(true);
        const body = formData;
        const url = "http://localhost:3000/transactions";
        const res = await fetchWrapper.post({ url, body });
        const data = await res.json();
        if (!res.ok || !data.success) {
            setError(data.message);
            setPending(false);
            return;
        }
        history.push("/transactions/get/" + data.transaction._id);
        setPending(false);
    };
    return (
        <TransactionForm handleSubmit={handleSubmit}
            actionText="Ajouter une transaction"
            transaction={{ name: "", desc: "", amount: "", list }} />
    );
}
export { CreateTransactionForm };