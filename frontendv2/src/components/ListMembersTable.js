import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchWrapper } from "lib/fetchWrapper";

const ListMembersTable = (props) => {
    const [list, setList] = useState(null);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const listName = props.listName;

    // Fetch list informations
    useEffect(() => {
        (async () => {
            var url = "http://localhost:3000/lists/get"
            if (listName) url = url + "/" + listName;
            const res = await fetchWrapper.get({ url: url });
            const data = await res.json();
            if (!res.ok || !data.success) {
                if (data) setError(data.message)
                else setError("Error");
            }
            console.log(data);
            setList(data.list);
        })()
    }, [listName]);

    // Handle submit success on remove or add member
    const handleSubmitSuccess = (data) => {
        setList(data.list);
        setPending(false);
    }

    // Handle remove member
    const handleAction = async (member) => {
        setPending(true);

        const { email } = member;
        const res = await fetchWrapper.delete({ url: "http://localhost:3000/members/remove", body: { email } });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setPending(false);
            return;
        }
        handleSubmitSuccess(data);
    }

    return (
        <>
            {list &&
                <>
                    <h1>{list.name}</h1>
                    {list.account} €
                    <Link to={"/transactions/getByList/" + list._id}>Transactions</Link>
                    <h2>Membres</h2>
                    < table >
                        <thead>
                            <tr>
                                <th scope="col">Name</th> <th scope="col">Numéro étudiant</th>
                                <th scope="col">Email</th> <th scope="col">Soutient</th>
                                <th scope="col">Role</th><th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.members.map(member =>
                                    <MemberRow member={member} pending={pending} handleAction={handleAction} handleSubmitSuccess={handleSubmitSuccess} />
                                )
                            }
                            <AddMemberForm list={list._id} handleSubmitSuccess={handleSubmitSuccess}></AddMemberForm>
                        </tbody>
                    </table>
                </>
            }
            {
                !list &&
                <h1>Loading list : {listName}</h1>
            }
            {error && error}
        </>)
}

const MemberRow = (props) => {
    const { member } = props;
    const [isEditing, setIsEditing] = useState(false);
    const handleDoubleClick = (e) => {
        if (e.detail === 2) {
            setIsEditing(true)
        }
    }
    const handleSubmitSuccess = async ({ formData, setPending, setError }) => {
        setPending(true);
        formData._id = member._id;
        const res = await fetchWrapper.put({ url: "http://localhost:3000/members/update", body: formData });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setError(data.message);
            setPending(false);
            return;
        }
        props.handleSubmitSuccess(data);

        setPending(false);
        setIsEditing(false);
    }
    return (
        <>
            {isEditing &&
                <MemberRowForm member={member} handleSubmitSuccess={handleSubmitSuccess} actionText={"Sauvegarder"} />
            }
            {!isEditing && <tr key={member._id}>
                <td onClick={handleDoubleClick}>{member.surname + " " + member.lastname}</td>
                <td onClick={handleDoubleClick}>{member.student_number}</td>
                <td onClick={handleDoubleClick}>{member.email}</td>
                <td onClick={handleDoubleClick}>{(member.support) ? "Oui" : "Non"}</td>
                <td onClick={handleDoubleClick}>{member.role}</td>
                <td>
                    <button className="submit" type="submit" disabled={props.pending} onClick={() => { props.handleAction(member) }}>Retirer</button>
                </td>
            </tr>
            }
        </>
    )
}
const AddMemberForm = (props) => {
    // Handle submit adding member
    const { list } = props;
    const handleSubmitSuccess = async ({ formData, setPending, setError }) => {
        setPending(true);
        const res = await fetchWrapper.post({ url: "http://localhost:3000/members/create", body: formData });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setError(data.message);
            setPending(false);
            return;
        }
        props.handleSubmitSuccess(data);

        setPending(false);
    }
    return (
        <MemberRowForm member={{ list }} handleSubmitSuccess={handleSubmitSuccess} actionText={"Ajouter"} />
    )
}

const MemberRowForm = (props) => {
    const { surname, lastname, student_number, email, support, role, list } = props.member;
    const { handleSubmitSuccess, actionText } = props;

    const [formData, setFormData] = useState({ surname, lastname, student_number, email, support, role, list });
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value })
        setError(null);
    }
    const handleFormChangeCheck = (e) => {
        const { id, checked } = e.target;
        setFormData({ ...formData, [id]: checked })
        setError(null);
    }
    const handleSubmit = (e) => {
        handleSubmitSuccess({ formData, setPending, setError });
    }
    return (
        <tr key="add">
            <td>
                <input id="surname" value={formData.surname} onChange={handleFormChange} type="text"></input>
                <input id="lastname" value={formData.lastname} onChange={handleFormChange} type="text"></input>
            </td>
            <td>
                <input id="student_number" value={formData.student_number} onChange={handleFormChange} type="text"></input>
            </td>
            <td>
                <input id="email" value={formData.email} onChange={handleFormChange} type="email"></input>
            </td>
            <td>
                <input id="support" value={formData.support} onChange={handleFormChangeCheck} type="checkbox"></input>
            </td>
            <td>

            </td>
            <td>
                {error && error}
                {!error &&
                    <button className="submit" type="submit" disabled={pending} onClick={handleSubmit}>{actionText}</button>
                }
            </td>
        </tr>
    )
}

export { ListMembersTable };