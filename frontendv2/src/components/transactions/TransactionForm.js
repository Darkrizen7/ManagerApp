import { useState } from "react";

const TransactionForm = (props) => {
    const { name, desc, amount, list } = props.transaction;
    const { actionText } = props;

    const [formData, setFormData] = useState({ name, desc, amount, list });
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
        setError(null);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(formData, setError, setPending);
    }
    return (
        <>
            <form>
                <input id="name" value={formData.name} onChange={handleFormChange} placeholder="Nom" type="text" />
                <input id="desc" value={formData.desc} onChange={handleFormChange} placeholder="Description" type="text" />
                <input id="amount" value={formData.amount} onChange={handleFormChange} placeholder="Montant" type="number" />
                <button className="submit" type="submit" disabled={pending} onClick={handleSubmit}>{actionText}</button>

            </form>
        </>
    );
}
export { TransactionForm };