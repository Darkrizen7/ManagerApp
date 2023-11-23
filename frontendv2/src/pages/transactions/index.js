import { useEffect, useState } from "react";

import { CreateTransactionForm, TransactionInfo, TransactionsTable } from "components";
import { fetchTransaction, fetchTransactions } from "lib/api";

import { PermProtect, usePerm } from "hooks/PermContext";
const Transactions = (props) => {
    const { list } = props.match.params;
    const [transactions, setTransactions] = useState(null);
    const { hasAccess } = usePerm();

    useEffect(() => {
        (async () => {
            const { dataTransactions } = await fetchTransactions(list);
            if (dataTransactions) setTransactions(dataTransactions);
        })();
    }, [list]);

    return (
        <PermProtect access="transactions.read" listId={list}>
            {transactions &&
                <TransactionsTable transactions={transactions} setTransactions={setTransactions}></TransactionsTable>
            }
            <br />
            {list && hasAccess("transactions.create", list) &&
                < CreateTransactionForm list={list}></CreateTransactionForm>
            }
        </PermProtect >

    );
}
const Transaction = (props) => {
    const { transactionId } = props.match.params;
    const [transaction, setTransaction] = useState(null);
    const { hasAccess } = usePerm();

    useEffect(() => {
        (async () => {
            const { dataTransaction } = await fetchTransaction(transactionId);
            if (dataTransaction) setTransaction(dataTransaction);
        })();
    }, [transactionId])

    return (
        <>
            {transaction && hasAccess("transactions.read", transaction.list._id) &&
                <TransactionInfo transaction={transaction} setTransaction={setTransaction} />
            }
        </>
    )
}
export { Transactions, Transaction };