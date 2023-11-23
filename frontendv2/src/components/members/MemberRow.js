import { useState } from "react";

import { MemberRowForm } from "components";
import { PermProtect } from "hooks/PermContext";

const MemberRow = (props) => {
    const { member, handleUpdateMember, handleRemoveMember } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [pending, setPending] = useState(false);

    const handleDoubleClick = (e) => {
        if (props.noedit) {
            if (props.handleClick) props.handleClick(member);
            return;
        }
        if (e.detail === 2) setIsEditing(true)
    }

    const handleFormUpdate = (formData, setPending, setError) => {
        handleUpdateMember(formData, setPending, setError, setIsEditing)
    }
    return (
        <>
            {isEditing &&
                <MemberRowForm member={member} handleAction={handleFormUpdate} actionText={"Sauvegarder"} />
            }
            {!isEditing &&
                <tr key={member._id}>
                    <td onClick={handleDoubleClick}>{member.surname}</td>
                    <td onClick={handleDoubleClick}>{member.lastname}</td>
                    <td onClick={handleDoubleClick}>{member.student_number}</td>
                    <td onClick={handleDoubleClick}>{member.email}</td>
                    <td onClick={handleDoubleClick}>{(member.support) ? "Oui" : "Non"}</td>
                    <td onClick={handleDoubleClick}>{member.role}</td>
                    <td>
                        <PermProtect access={"members.delete"} listId={member.list} noshow={true}>
                            <button className="submit"
                                type="submit"
                                disabled={pending}
                                onClick={() => { handleRemoveMember(member, setPending) }}>Retirer</button>
                        </PermProtect>
                    </td>
                </tr>
            }
        </>
    )
}
export { MemberRow };