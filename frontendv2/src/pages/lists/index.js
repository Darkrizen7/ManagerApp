import './lists.css'

import { ListMembersTable, ListsTable } from 'components';


const GetLists = () => {
    return (
        <>
            <h1>Toutes les listes</h1>
            <ListsTable />
        </>
    )
}

const GetList = (props) => {
    const { listName } = props.match.params;
    return (
        <ListMembersTable listName={listName}></ListMembersTable>
    );
}
export { GetLists, GetList };