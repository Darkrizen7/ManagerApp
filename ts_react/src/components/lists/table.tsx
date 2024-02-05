import { Table } from "components/table";
import { List, Member } from "primitives";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListForm } from "./forms";

type IProps = {
    lists: List[],
    onDelete: (list: List) => void,
    onUpdate: (list: List) => Promise<boolean>,
    allowEdit: boolean,
    allowDelete: boolean,
}
export const ListsTable = ({ lists, onDelete, onUpdate, allowEdit, allowDelete }: IProps): React.JSX.Element => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [listEditing, setListEditing] = useState<List>();
    const columns = [
        {
            header: 'Infos',
            columns: [
                { accessorKey: 'pre_name', header: 'Nom préselec' },
                { accessorKey: 'name', header: 'Nom' },
                { accessorKey: 'campagne', header: 'Campagne' },
            ],
        },
        {
            header: 'Membres',
            columns: [
                { accessorKey: 'members', enableColumnFilter: false, id: 'members_total', header: "Total", cell: (info: { getValue: () => Member[] }) => (info.getValue().length) },
                { accessorKey: 'members', enableColumnFilter: false, id: 'members', header: "Membre", cell: (info: { getValue: () => Member[] }) => (info.getValue().filter((member: Member) => (!member.support)).length) },
                { accessorKey: 'members', enableColumnFilter: false, id: 'members_support', header: "Soutiens", cell: (info: { getValue: () => Member[] }) => (info.getValue().filter((member: Member) => member.support).length) },
            ],
        },
        {
            header: 'Actions',
            cell: (info: any) => {
                return (
                    <>
                        <button
                            type="submit"
                            onClick={() => {
                                navigate("/list/" + info.row.original._id)
                            }}>Voir</button>
                        {allowDelete &&
                            <button
                                type="submit"
                                onClick={() => { setIsEditing(true); setListEditing(info.row.original) }}>Modifier</button >
                        }
                        {allowEdit &&
                            <button
                                type="submit"
                                onClick={() => onDelete(info.row.original)}>Retirer</button >
                        }
                    </>
                );
            },
        }
    ]
    return (
        <>
            <Table<List> columns={columns} data={lists}></Table>
            {isEditing &&
                <ListForm list={listEditing} onSubmit={async (list: List) => { await onUpdate(list); setIsEditing(false) }} headerText={"Modifier la liste"} actionText={"Modifier"} />
            }
        </>
    )
}