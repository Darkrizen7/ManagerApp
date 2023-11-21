import { useState } from "react";
import { fetchWrapper } from "lib/fetchWrapper";
import { useHistory } from "react-router-dom";

const CreateTransactionForm = (props) => {
    const { list } = props;

    const history = useHistory();

    const [formData, setFormData] = useState({ name: "", desc: "", amount: 0, list });
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
        setError(null);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        (async () => {
            const body = formData;
            const url = "http://localhost:3000/transactions/create";
            const res = await fetchWrapper.post({ url, body });
            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.message);
                return;
            }
            history.push("/transactions/get/" + data.transaction._id);
        })();
    }
    return (
        <>
            <form>
                <input id="name" value={formData.name} onChange={handleFormChange} placeholder="Nom" type="text" />
                <input id="desc" value={formData.desc} onChange={handleFormChange} placeholder="Description" type="text" />
                <input id="amount" value={formData.amount} onChange={handleFormChange} placeholder="Montant" type="number" />
                <button className="submit" type="submit" disabled={pending} onClick={handleSubmit}>Ajouter la transaction</button>

            </form>
        </>
    );
}
export { CreateTransactionForm };