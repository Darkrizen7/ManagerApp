import './lists.css'

import { useState, useEffect } from 'react';
import { ListInfo, ListsTable } from 'components';

import { fetchWrapper } from 'lib/fetchWrapper';
const GetLists = () => {
    const [lists, setLists] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetchWrapper.get({ url: "http://localhost:3000/lists" });
            const data = await res.json();
            if (!res.ok || !data.success) {
                console.log(data);
                return;
            }
            setLists(data.lists);
        })();
    }, [])

    return (
        <>
            <h1>Toutes les listes</h1>
            <ListsTable lists={lists} setLists={setLists} />
        </>
    )
}

const GetList = (props) => {
    const _id = props.match.params.listId;
    const [list, setList] = useState(null);

    useEffect(() => {
        (async () => {
            const url = new URL("http://localhost:3000/lists/get");
            if (_id) url.searchParams.append('_id', _id);

            const res = await fetchWrapper.get({ url });
            const data = await res.json();

            if (!res.ok || !data.success) {
            }
            setList(data.list);
        })()
    }, [_id]);

    return (
        <ListInfo list={list} setList={setList}></ListInfo>
    );
}
export { GetLists, GetList };