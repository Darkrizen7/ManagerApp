import { useState } from "react";

const MemberRowForm = (props) => {
    const { _id, surname, lastname, student_number, email, support, role, list } = props.member;
    const { handleAction, actionText } = props;

    const [formData, setFormData] = useState({
        _id: _id ? _id : "",
        surname: surname ? surname : "",
        lastname: lastname ? lastname : "",
        student_number: student_number ? student_number : "",
        email: email ? email : "",
        support, role, list
    });
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
        handleAction(formData, setPending, setError);
    }
    return (
        <tr key="add">
            <td>
                <input placeholder="Prénom" id="surname" value={formData.surname} onChange={handleFormChange} type="text"></input>
            </td>
            <td>
                <input placeholder="Nom" id="lastname" value={formData.lastname} onChange={handleFormChange} type="text"></input>
            </td>
            <td>
                <input placeholder="Numéro étudiant" id="student_number" value={formData.student_number} onChange={handleFormChange} type="text"></input>
            </td>
            <td>
                <input placeholder="Email" id="email" value={formData.email} onChange={handleFormChange} type="email"></input>
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
export { MemberRowForm }