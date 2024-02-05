import React from "react";
import { useEffect, useState } from "react";

import { CreateTransactionForm, TransactionInfo, TransactionsTable, TransactionsChart } from "components";
import { fetchTransaction, fetchTransactions, fetchList } from "lib/api";

import { PermProtect, usePerm } from "hooks/PermContext";

import { ITransaction, IList } from "interfaces";

interface TransactionsRouteComponentProps {
    match: {
        params: {
            list_id: string;
        }
    }
}
const TransactionsRoute: React.FC<TransactionsRouteComponentProps> = (props) => {
    const { list_id } = props.match.params;
    const [transactions, setTransactions] = useState<[ITransaction[], Function]>();
    const [list, setList] = useState<IList>();

    const { hasAccess } = usePerm<Function>();

    useEffect(() => {
        (async () => {
            const { dataTransactions } = await fetchTransactions<ITransaction[]>(list_id);
            if (dataTransactions) setTransactions(dataTransactions);
            if (!list_id) return
            const { dataList } = await fetchList<IList>(list_id, false);
            if (dataList) setList(dataList);
        })();
    }, [list_id]);

    return (
        <>
            <h1>Transactions</h1>
            <PermProtect access="transactions.read" listId={list_id}>
                {transactions &&
                    <TransactionsTable transactions={transactions} setTransactions={setTransactions}></TransactionsTable>
                }
                <br />
                {list_id && hasAccess("transactions.create", list_id) &&
                    < CreateTransactionForm list={list_id}></CreateTransactionForm>
                }
            </PermProtect >
            {list_id &&
                <TransactionsChart transactions={transactions} campagne={list?.campagne}>

                </TransactionsChart>
            }
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
    const [transaction, setTransaction] = useState<ITransaction>();
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