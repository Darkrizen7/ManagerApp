import { useState, useEffect } from 'react';

import { PermProtect } from 'hooks/PermContext';
import { Table } from 'components';
import { useHistory } from 'react-router-dom';

const ListsTable = (props) => {
    const { lists } = props;
    const { handleRemoveList } = props.handles;
    const history = useHistory();
    const goToList = (list) => {
        history.push("/lists/get/" + list._id)
    }
    const columns = [
        {
            header: 'Infos',
            columns: [
                { accessorKey: 'name', header: 'Nom' },
                { accessorKey: 'campagne', header: 'Campagne' },
            ],
        },
        {
            header: 'Membres',
            columns: [
                { accessorKey: 'members', enableColumnFilter: false, id: 'members_total', header: "Total", cell: info => (info.getValue().length) },
                { accessorKey: 'members', enableColumnFilter: false, id: 'members', header: "Membre", cell: info => (info.getValue().filter(member => (!member.support)).length) },
                { accessorKey: 'members', enableColumnFilter: false, id: 'members_support', header: "Soutiens", cell: info => (info.getValue().filter(member => (member.support)).length) },
            ],
        },
        {
            header: 'Actions',
            cell: info => {
                return (
                    <>
                        <PermProtect access={"lists.readOne"} listId={info.row.original._id} noshow={true}>
                            <button className="submit"
                                type="submit"
                                onClick={() => { goToList(info.row.original) }}>Voir</button>
                        </PermProtect>
                        <PermProtect access={"lists.delete"} listId={info.row.original._id} noshow={true}>
                            <button className="submit"
                                type="submit"
                                onClick={() => { handleRemoveList(info.row.original) }}>Retirer</button>
                        </PermProtect>
                    </>
                );
            },
        }
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!lists) return;
        setData(lists);
    }, [lists]);

    return (
        <>
            <Table columns={columns} data={data} />
        </>
    );
};

export { ListsTable };
