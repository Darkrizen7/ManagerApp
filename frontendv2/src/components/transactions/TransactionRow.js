import { useHistory } from "react-router-dom";
import { useState } from "react";

const TransactionRow = (props) => {
    const { transaction, handleRemove } = props;
    const [pending, setPending] = useState();

    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push("/transactions/get/" + transaction._id);
    }
    const handleAction = (e) => {
        e.preventDefault();
        handleRemove(transaction, setPending);
    }
    return (
        <tr key={transaction._id}>
            <td onClick={handleClick}>{transaction.list.name}</td>
            <td onClick={handleClick}>{transaction.name}</td>
            <td onClick={handleClick}>{transaction.desc}</td>
            <td onClick={handleClick} style={{ color: (transaction.amount > 0) ? "green" : "red" }}>{transaction.amount}€</td>
            <td onClick={handleClick} style={{ color: transaction.approved ? "green" : "red" }}>{transaction.approved ? "Oui" : "Non"}</td>
            <td>
                <button className="submit" type="submit" disabled={pending} onClick={handleAction}>Retirer</button>
            </td>
        </tr>
    );
}
export { TransactionRow }