import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";

import { IList, ITransaction } from "interfaces";

import { Table } from "components";

const ListsTable: React.FC<{ lists: IList[] }> = ({ lists }): JSX.Element => {
    const history = useHistory();
    const columns = useMemo(() => ([
        {
            header: 'Infos',
            columns: [
                {
                    accessorKey: 'name', header: 'Nom', onClick: (info) => {
                        history.push("/lists/get/" + info.row.original._id)
                    }
                },
            ],
        },
        {
            header: 'Statistics',
            columns: [
                {
                    accessorKey: 'transactions',
                    header: 'Total €',
                    id: "TotalTransactions",
                    cell: (info: { getValue: () => ITransaction[]; }) => (info.getValue().reduce<number>(
                        (accumulator, transaction) => {
                            return accumulator + transaction.amount;
                        }, 0) + " €")
                },
                {
                    accessorKey: 'transactions',
                    header: 'Total Approuvé',
                    id: "TotalTransactionsApproved",
                    cell: (info: { getValue: () => ITransaction[]; }) => (info.getValue().reduce<number>(
                        (accumulator, transaction) => {
                            return accumulator + (transaction.approved ? transaction.amount : 0);
                        }, 0) + " €")
                },
                {
                    accessorKey: 'transactions',
                    header: 'Apport Perso',
                    id: "TotalApportPerso",
                    cell: (info: { getValue: () => ITransaction[]; }) => (info.getValue().reduce<number>(
                        (accumulator, transaction) => {
                            return accumulator + (transaction.type === "Apport perso" ? transaction.amount : 0);
                        }, 0) + " €")
                },
                {
                    accessorKey: 'transactions',
                    header: 'Nb Apport Perso',
                    id: "Nb Apport Perso",
                    cell: (info: { getValue: () => ITransaction[]; }) => (info.getValue().reduce<number>(
                        (accumulator, transaction) => {
                            return accumulator + (transaction.type === "Apport perso" ? 1 : 0);
                        }, 0))
                }
            ]
        }
    ]), [history]);
    return (
        <>
            {lists &&
                <Table showItem={100} columns={columns} data={lists} />
            }
        </>
    )
}
export { ListsTable };