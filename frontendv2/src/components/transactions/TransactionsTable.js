import { removeTransaction } from "lib/api";
import { TransactionRow } from ".";

const TransactionsTable = (props) => {
    const { transactions, setTransactions } = props;
    const handleRemove = async (transaction, setPending) => {
        setPending(true);
        const removed = await removeTransaction(transaction._id);
        if (removed) setTransactions(transactions.filter((tr) => tr._id !== transaction._id));
        setPending(false);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">Liste</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Description</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Approuvée</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {(transactions && transactions.length > 0) ?
                    transactions.map(transaction =>
                        <TransactionRow key={transaction._id} transaction={transaction} handleRemove={handleRemove} />
                    ) : null
                }
            </tbody>
        </table>
    );
}
export { TransactionsTable };