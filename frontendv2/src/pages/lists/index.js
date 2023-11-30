import { useState, useEffect } from 'react';
import { CreateListForm, ListInfo, ListsTable } from 'components';

import { fetchLists, fetchList, deleteList, createList } from 'lib/api';
import { PermProtect, usePerm } from 'hooks/PermContext';

const Lists = () => {
    const [lists, setLists] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataLists } = await fetchLists();
            if (dataLists) setLists(dataLists);
        })();
    }, [])

    const handleAddList = async (data, setApiError) => {
        const { dataList, error } = await createList(data);
        if (error) {
            if (!error.errors && !error.message) return setApiError({ message: "Erreur interne" });
            setApiError(error);
        } else {
            setLists([...lists, dataList]);
        }
    }
    const handleRemoveList = async (list) => {
        const { error } = await deleteList(list._id)
        if (!error) setLists(lists.filter(l => (l._id !== list._id)));
    }
    return (
        <>
            <h1>Toutes les listes</h1>
            <PermProtect access="lists.read">
                <ListsTable handles={{ handleRemoveList }} lists={lists} />
            </PermProtect>
            <PermProtect access="lists.create">
                <CreateListForm handleAddList={handleAddList}></CreateListForm>
            </PermProtect>
        </>
    )
}

const List = (props) => {
    const _id = props.match.params.listId;
    const { userMember } = usePerm();
    const [list, setList] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataList } = await fetchList(_id ? _id : "mine");
            if (dataList) setList(dataList);
        })()
    }, [_id]);

    return (
        <PermProtect access="lists.readOne" listId={_id ? _id : (userMember ? userMember.list._id : null)}>
            <ListInfo list={list} setList={setList}></ListInfo>
        </PermProtect>
    );
}
export { Lists, List };