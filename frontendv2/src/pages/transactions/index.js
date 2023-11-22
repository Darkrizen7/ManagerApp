import { useEffect, useState } from "react";

import { fetchWrapper } from "lib/fetchWrapper";
import { CreateTransactionForm, TransactionInfo, TransactionsTable } from "components";

const GetTransactions = (props) => {
    const { list } = props.match.params;
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        (async () => {
            const url = new URL("http://localhost:3000/transactions")
            if (list) url.searchParams.append("list", list);

            const res = await fetchWrapper.get({ url });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return;
            }
            setTransactions(data.transactions);
        })();
    }, [list]);

    return (
        <>
            {transactions &&
                <TransactionsTable transactions={transactions} setTransactions={setTransactions}></TransactionsTable>
            }
            <br />
            {list &&
                <CreateTransactionForm list={list}></CreateTransactionForm>
            }
        </>
    );
}
const GetTransaction = (props) => {
    const { transactionId } = props.match.params;
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        (async () => {
            const url = new URL("http://localhost:3000/transactions")
            url.searchParams.append("_id", transactionId);

            const res = await fetchWrapper.get({ url });
            const data = await res.json();
            if (!res.ok || !data.success) {
                return;
            }
            setTransaction(data.transaction);
        })();
    }, [transactionId])

    return (
        <TransactionInfo transaction={transaction} setTransaction={setTransaction} />
    )
}
export { GetTransactions, GetTransaction };