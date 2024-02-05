import { TransactionForm, TransactionsTable, ViewTransaction } from "components/transactions";
import { usePerm } from "hooks";
import { API_ApproveTransaction, API_CreateTransaction, API_DownloadMergedTransaction, API_GetTransaction, API_GetTransactions, API_RemoveTransaction, API_UpdateTransaction } from "lib";
import { List, Transaction } from "primitives";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const TransactionsController = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { list_id } = useParams();
    const { hasAccess } = usePerm();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetTransactions(list_id);
            if (error || !data) { return; }
            setTransactions(data.transactions)
        })()
    }, [list_id])
    const onTransactionApproved = async (transaction: Transaction): Promise<boolean> => {
        if (!hasAccess("transactions.approve", list_id)) return false;
        const { data, error } = await API_ApproveTransaction(transaction);
        if (error || !data) { window.confirm(error?.message); return false; }
        setTransactions([...transactions.map((tr) => { if (tr._id !== transaction._id) { return tr } else { return data.transaction } })]);
        return true;
    }
    const onTransactionDeleted = async (transaction: Transaction): Promise<boolean> => {
        if (!window.confirm("Voulez-vous supprimer la liste?")) return false;
        if (!hasAccess(transaction.approved ? "transactions.delete" : "transactions.deleteNonApproved", list_id)) return false;
        const { error } = await API_RemoveTransaction(transaction);
        if (error) { window.confirm(error?.message); return false; }
        setTransactions(transactions.filter(tr => tr._id !== transaction._id))
        return true;
    }
    const onTransactionAdded = async (transaction: Transaction): Promise<boolean> => {
        if (!hasAccess("transactions.create", list_id)) return false;
        const { data, error } = await API_CreateTransaction(transaction);
        if (error || !data) { window.confirm(error?.message); return false; }
        setTransactions([data.transaction, ...transactions]);
        return true
    }
    return (<>
        {hasAccess("transactions.read", list_id) &&
            <>
                <TransactionsTable
                    transactions={transactions}
                    onTransactionApproved={onTransactionApproved}
                    onTransactionDeleted={onTransactionDeleted}
                    allowApprove={hasAccess("transactions.approve", list_id)}
                    allowDelete={(transaction) => hasAccess(transaction.approved ? "transactions.delete" : "transactions.deleteNonApproved", list_id)} />
                {hasAccess("transactions.create", list_id) && list_id &&
                    <TransactionForm transaction={new Transaction({ list: new List({ _id: list_id }) })} onSubmit={onTransactionAdded} headerText={"Ajouter une transaction"} actionText={"Ajouter"} />
                }
            </>
        }</>
    )
}
export const TransactionController = (): React.JSX.Element => {
    const { _id } = useParams();
    const [transaction, setTransaction] = useState<Transaction>(new Transaction({ _id: "-1" }));
    const { hasAccess } = usePerm();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetTransaction(_id);
            if (error || !data) { return; }
            setTransaction(data.transaction)
        })()
    }, [_id])
    const handleApprove = async (transaction: Transaction): Promise<boolean> => {
        const { data, error } = await API_ApproveTransaction(transaction);
        if (error || !data) return false;
        setTransaction(data.transaction);
        return true;
    }
    const handleDownloadMerged = async (transaction: Transaction) => {
        const { error } = await API_DownloadMergedTransaction(transaction);
        if (error) return false;
        return true;
    };
    const handleEdit = async (transaction: Transaction) => {
        const { data, error } = await API_UpdateTransaction(transaction);
        if (error || !data) return false;
        setTransaction(data?.transaction);
        return true
    };
    return (
        <>
            {hasAccess("transactions.read", transaction.list?._id) &&
                <ViewTransaction
                    transaction={transaction}
                    handleApprove={handleApprove}
                    handleDownloadMerged={handleDownloadMerged}
                    handleEdit={handleEdit}
                    allowEdit={hasAccess("transactions.update", transaction.list instanceof List ? transaction.list._id : transaction.list)}
                    allowApprove={hasAccess("transactions.approve", transaction.list instanceof List ? transaction.list._id : transaction.list)}
                />
            }
        </>
    )
}