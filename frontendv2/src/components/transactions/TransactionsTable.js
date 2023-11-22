import { TransactionRow } from ".";
import { fetchWrapper } from "lib/fetchWrapper";

const TransactionsTable = (props) => {
    const { transactions, setTransactions } = props;
    const handleRemove = async (transaction, setPending) => {
        setPending(true);
        const body = transaction;
        const res = await fetchWrapper.delete({ url: "http://localhost:3000/transactions", body });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setPending(false);
            return;
        }

        setPending(false);
        setTransactions(transactions.filter((tr) => tr._id != transaction._id));
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