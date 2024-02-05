import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { PermProtect, usePerm } from 'hooks/PermContext';
import { Table } from 'components';
import { removeTransaction, approveTransaction } from 'lib/api';

const TransactionsTable = (props) => {
    const { transactions, setTransactions } = props;
    const history = useHistory();
    const { hasAccess } = usePerm();

    const goToTransaction = (transaction) => {
        history.push("/transactions/get/" + transaction._id);
    }
    const handleRemoveTransaction = async (transaction) => {
        const removed = await removeTransaction(transaction._id);
        if (removed) setTransactions(transactions.filter((tr) => tr._id !== transaction._id));
    }

    const handleApproveTransaction = async (transaction) => {
        if (!hasAccess("transactions.approve", transaction.list._id)) { return; }
        const { dataTransaction } = await approveTransaction(transaction._id);
        if (dataTransaction) {
            setTransactions(transactions.map((tr) => {
                return (tr._id === transaction._id) ? dataTransaction : tr
            }))
        }
    }

    const columns = [
        {
            header: 'Infos',
            columns: [
                { accessorKey: 'name', header: 'Nom' },
                { accessorKey: 'list.name', header: 'Liste' },
                { accessorKey: 'amount', header: 'Montant', cell: info => (<span style={{ color: info.getValue() >= 0 ? "green" : "red" }}>{info.getValue() + "€"}</span>) },
                { accessorKey: 'approved', header: 'Approuvé', cell: info => (<span style={{ color: info.getValue() ? "green" : "red" }}>{info.getValue() ? "Oui" : "Non"}</span>) },
            ],
        },
        {
            header: 'Actions',
            cell: info => {
                return (
                    <>
                        <PermProtect access={"transactions.read"} listId={info.row.original.list._id} noshow={true}>
                            <button className="submit"
                                type="submit"
                                onClick={() => { goToTransaction(info.row.original) }}>Voir</button>
                        </PermProtect>
                        <PermProtect access={"transactions.delete" + (info.row.original.approved ? "" : "NonApproved")} listId={info.row.original.list._id} noshow={true}>
                            <button className="submit"
                                type="submit"
                                onClick={() => { handleRemoveTransaction(info.row.original) }}>Retirer</button>
                        </PermProtect>
                        {hasAccess("transactions.approve", info.row.original.list._id) && !info.row.original.approved &&
                            <button className="submit"
                                type="submit"
                                onClick={() => { handleApproveTransaction(info.row.original) }}>
                                Approuver
                            </button>
                        }
                    </>
                );
            },
        }
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!transactions) return;
        setData(transactions);
    }, [transactions]);

    return (
        <>
            <Table columns={columns} data={data} />
        </>
    );
};

export { TransactionsTable };
