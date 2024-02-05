import { Table } from "components/table";
import { Transaction } from "primitives";
import { NavLink, useNavigate } from "react-router-dom";

type IProps = {
    transactions: Transaction[],
    onTransactionApproved: (transaction: Transaction) => Promise<boolean>,
    onTransactionDeleted: (transaction: Transaction) => Promise<boolean>,
    allowApprove: boolean,
    allowDelete: boolean | ((transaction: Transaction) => boolean),
}
export const TransactionsTable = (props: IProps): React.JSX.Element => {
    const navigate = useNavigate();
    const columns = [
        {
            header: 'Infos',
            columns: [
                { accessorKey: 'name', header: 'Nom' },
                { accessorKey: 'list.name', header: 'Liste', cell: (info: any) => (<NavLink to={"/list/" + info.row.original.list._id}>{info.getValue()}</NavLink>) },
                { accessorKey: 'amount', header: 'Montant', cell: (info: any) => (<span style={{ color: info.getValue() >= 0 ? "green" : "red" }}>{info.getValue() + "€"}</span>) },
                { accessorKey: 'approved', header: 'Approuvé', cell: (info: any) => (<span style={{ color: info.getValue() ? "green" : "red" }}>{info.getValue() ? "Oui" : "Non"}</span>) },
            ],
        },
        {
            header: 'Actions',
            cell: (info: any) => {
                return (
                    <>
                        <button
                            type="submit"
                            onClick={() => { navigate("/transaction/" + info.row.original._id); }}>
                            Voir
                        </button>
                        {((typeof props.allowDelete == "boolean" && props.allowDelete) || (typeof props.allowDelete == "function" && props.allowDelete(info.row.original as Transaction))) &&
                            <button
                                type="submit"
                                onClick={() => { props.onTransactionDeleted(info.row.original as Transaction) }}>
                                Retirer
                            </button>
                        }
                        {!info.row.original.approved && props.allowApprove &&
                            <button
                                type="submit"
                                onClick={() => { props.onTransactionApproved(info.row.original as Transaction) }}>
                                Approuver
                            </button>
                        }
                    </>
                );
            },
        }
    ]
    return (
        <>
            <Table<Transaction> columns={columns} data={props.transactions} />
        </>
    )
}