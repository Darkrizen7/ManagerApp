import { useState } from 'react';
import { fetchWrapper } from 'lib/fetchWrapper';

import { CreateListForm, ListRow } from '.';

const ListsTable = (props) => {
    const { lists, setLists } = props;
    const [pending, setPending] = useState(false);

    const handleAction = async (list) => {
        setPending(true);

        const { _id } = list;
        const res = await fetchWrapper.delete({ url: "http://localhost:3000/" + "lists/remove", body: { _id } });
        const data = await res.json();
        if (!res.ok || !data.success) {
            setPending(false);
            return;
        }
        setLists(data.lists);
        setPending(false);
    }
    const handleAddList = (lists) => {
        setLists(lists);
    }
    return (
        <>
            {lists && lists.length &&
                < table >
                    <thead>
                        <tr>
                            <th scope="col">Liste</th>
                            <th scope="col">Campagne</th>
                            <th scope="col" className='memberCount'>Nombre</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map(list =>
                                <ListRow key={list._id} pending={pending} handleAction={handleAction} list={list}></ListRow>
                            )
                        }
                        <CreateListForm handleAddList={handleAddList} />
                    </tbody>
                </table>
            }
            {!lists && "Loading lists"}
        </>
    )
}
export { ListsTable };