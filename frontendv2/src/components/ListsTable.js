import { useState, useEffect } from 'react';
import { fetchWrapper } from 'lib/fetchWrapper';
import { useHistory } from 'react-router-dom';

const ListsTable = () => {
    const [lists, setLists] = useState(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetchWrapper.get({ url: "http://localhost:3000/lists" });
            const data = await res.json();
            console.log(data);
            setLists(data);
        })()
    }, [])

    const handleSubmitSuccess = (data) => {
        setLists(data.lists);
        setPending(false);
    }
    const handleAction = async (list) => {
        setPending(true);

        const { name } = list;
        const res = await fetchWrapper.delete({ url: "http://localhost:3000/" + "lists/remove", body: { name } });
        const data = await res.json();
        if (!res.ok || !data.success) {
            console.log(data.message);
            setPending(false);
            return;
        }
        handleSubmitSuccess(data);
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
                                <ListRow pending={pending} handleAction={handleAction} list={list}></ListRow>
                            )
                        }
                        <AddListForm handleSubmitSuccess={handleSubmitSuccess} />
                    </tbody>
                </table>
            }
            {!lists && "Loading lists"}
        </>
    )
}

const AddListForm = (props) => {
    const [formData, setFormData] = useState({ name: "", campagne: "" });
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        setPending(true);

        e.preventDefault();
        const res = await fetchWrapper.post({ url: "http://localhost:3000/" + "lists/create", body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) {
            setError(data.message);
            return;
        }
        props.handleSubmitSuccess(data);

        setPending(false);
    }

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
        setError(null);
    }

    if (true) {
        return (
            <tr key="add">
                <td>
                    <input id="name" value={formData.name} onChange={handleFormChange} type="text"></input>
                </td>
                <td>
                    <select id="campagne" value={formData.campagne} onChange={handleFormChange}>
                        <option value="">Sélectionner une option</option>
                        <option value="Ski Club">Ski Club</option>
                        <option value="Petit Paumé">Petit Paumé</option>
                        <option value="BDE">BDE</option>
                        <option value="BDA">BDA</option>
                    </select>
                </td>
                <td>

                </td>
                <td>
                    {error && error}
                    {!error &&
                        <button className="submit" type="submit" disabled={pending} onClick={handleSubmit}>Ajouter</button>
                    }
                </td>
            </tr>
        )
    }
}

const ListRow = (props) => {
    const history = useHistory();
    const { list, pending, handleAction } = props;
    return (
        <tr key={list._id} >
            <td onClick={() => { history.push("/lists/get/" + list.name) }}>{list.name}</td>
            <td onClick={() => { history.push("/lists/get/" + list.name) }}>{list.campagne}</td>
            <td onClick={() => { history.push("/lists/get/" + list.name) }} className="memberCount">{list.members.length}</td>
            <td>
                <button className="submit" type="submit" disabled={pending} onClick={() => { handleAction(list) }}>Retirer</button>
            </td>
        </tr>
    )
}
export { ListsTable };