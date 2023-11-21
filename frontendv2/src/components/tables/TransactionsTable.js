import { useHistory } from "react-router-dom";

const TransactionsTable = (props) => {
    const { transactions } = props;
    const history = useHistory();

    const handleClick = (e, transactionId) => {
        e.preventDefault();
        history.push("/transactions/get/" + transactionId);
    }
    return (
        <table>
            <thead>
                <tr scope="row">
                    <th scope="col">Liste</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Approuvée</th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.length &&
                    transactions.map(transaction =>
                        <tr onClick={(e) => { handleClick(e, transaction._id) }} key={transaction._id}>
                            <td>{transaction.list.name}</td>
                            <td>{transaction.name}</td>
                            <td>{transaction.desc}</td>
                            <td style={{ color: (transaction.amount > 0) ? "green" : "red" }}>{transaction.amount}€</td>
                            <td style={{ color: transaction.approved ? "green" : "red" }}>{transaction.approved ? "Oui" : "Non"}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}
export { TransactionsTable };