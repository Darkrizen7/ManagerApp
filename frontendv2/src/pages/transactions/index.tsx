import React from "react";
import { useEffect, useState } from "react";

import { CreateTransactionForm, TransactionInfo, TransactionsTable } from "components";
import { fetchTransaction, fetchTransactions } from "lib/api";

import { PermProtect, usePerm } from "hooks/PermContext";

import { Transaction } from "interfaces";

interface TransactionsRouteComponentProps {
    match: {
        params: {
            list: string;
        }
    }
}
const TransactionsRoute: React.FC<TransactionsRouteComponentProps> = (props) => {
    const { list } = props.match.params;
    const [transactions, setTransactions] = useState<Transaction[]>();
    const { hasAccess } = usePerm<Function>();

    useEffect(() => {
        (async () => {
            const { dataTransactions } = await fetchTransactions<Transaction[]>(list);
            if (dataTransactions) setTransactions(dataTransactions);
        })();
    }, [list]);

    return (
        <>
            <h1>Transactions</h1>
            <PermProtect access="transactions.read" listId={list}>
                {transactions &&
                    <TransactionsTable transactions={transactions} setTransactions={setTransactions}></TransactionsTable>
                }
                <br />
                {list && hasAccess("transactions.create", list) &&
                    < CreateTransactionForm list={list}></CreateTransactionForm>
                }
            </PermProtect >
        </>
    );
}

interface TransactionRouteComponentProps {
    match: {
        params: {
            transactionId: string;
        }
    }
}
const TransactionRoute: React.FC<TransactionRouteComponentProps> = (props) => {
    const { transactionId } = props.match.params;
    const [transaction, setTransaction] = useState<Transaction>();
    const { hasAccess } = usePerm<Function>();

    useEffect(() => {
        (async () => {
            const { dataTransaction } = await fetchTransaction(transactionId);
            if (dataTransaction) setTransaction(dataTransaction);
        })();
    }, [transactionId])

    return (
        <>
            {transaction && hasAccess("transactions.read", transaction.list._id) &&
                <>
                    <TransactionInfo transaction={transaction} setTransaction={setTransaction} />
                </>
            }
        </>
    )
}
export { TransactionsRoute, TransactionRoute };