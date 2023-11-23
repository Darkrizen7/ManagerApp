import './lists.css'

import { useState, useEffect } from 'react';
import { ListInfo, ListsTable } from 'components';

import { fetchLists, fetchList } from 'lib/api';
import { PermProtect, usePerm } from 'hooks/PermContext';
const Lists = () => {
    const [lists, setLists] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataLists } = await fetchLists();
            if (dataLists) setLists(dataLists);
        })();
    }, [])

    return (
        <>
            <h1>Toutes les listes</h1>
            <PermProtect access="lists.read">
                <ListsTable lists={lists} setLists={setLists} />
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