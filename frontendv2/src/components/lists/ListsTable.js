import { useState } from 'react';

import { CreateListForm, ListRow } from '.';
import { deleteList } from 'lib/api';

const ListsTable = (props) => {
    const { lists, setLists } = props;
    const [pending, setPending] = useState(false);

    const handleAction = async (list) => {
        setPending(true);
        const { dataLists } = await deleteList(list._id)
        if (dataLists) setLists(dataLists);
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