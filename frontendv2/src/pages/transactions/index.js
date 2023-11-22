import { useEffect, useState } from "react";

import { fetchWrapper } from "lib/fetchWrapper";
import { CreateTransactionForm, TransactionInfo, TransactionsTable } from "components";
import { fetchTransaction, fetchTransactions } from "lib/api";

const Transactions = (props) => {
    const { list } = props.match.params;
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataTransactions } = await fetchTransactions(list);
            if (dataTransactions) setTransactions(dataTransactions);
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
const Transaction = (props) => {
    const { transactionId } = props.match.params;
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataTransaction } = await fetchTransaction(transactionId);
            if (dataTransaction) setTransaction(dataTransaction);
        })();
    }, [transactionId])

    return (
        <TransactionInfo transaction={transaction} setTransaction={setTransaction} />
    )
}
export { Transactions, Transaction };