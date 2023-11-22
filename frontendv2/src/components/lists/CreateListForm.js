import { useState } from 'react';

import { createList } from 'lib/api';

const CreateListForm = (props) => {
    const { handleAddList } = props;
    const [formData, setFormData] = useState({ name: "", campagne: "" });
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        setPending(true);
        e.preventDefault();
        const { dataLists } = await createList(formData);
        if (dataLists) handleAddList(dataLists);
        setPending(false);
    }

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
        setError(null);
    }
    return (
        <tr key="add">
            <td>
                <input placeholder="Nom" id="name" value={formData.name} onChange={handleFormChange} type="text"></input>
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
export { CreateListForm }