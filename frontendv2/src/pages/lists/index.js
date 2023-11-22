import './lists.css'

import { useState, useEffect } from 'react';
import { ListInfo, ListsTable } from 'components';

import { fetchLists, fetchList } from 'lib/api';
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
            <ListsTable lists={lists} setLists={setLists} />
        </>
    )
}

const List = (props) => {
    const _id = props.match.params.listId;
    const [list, setList] = useState(null);

    useEffect(() => {
        (async () => {
            const { dataList } = await fetchList(_id ? _id : "mine");
            if (dataList) setList(dataList);
        })()
    }, [_id]);

    return (
        <ListInfo list={list} setList={setList}></ListInfo>
    );
}
export { Lists, List };