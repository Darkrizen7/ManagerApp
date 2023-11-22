import { useEffect, useState } from "react";

import { fetchWrapper } from "lib/fetchWrapper";
import { MembersTable } from "components";
import { useHistory } from "react-router-dom";
import { fetchMembers } from "lib/api";

const GetMembers = () => {
    const [members, setMembers] = useState(null);
    const history = useHistory();

    const handleUpdateMember = () => { }
    const handleAddMember = () => { }
    const handleRemoveMember = () => { }

    useEffect(() => {
        (async () => {
            const { dataMembers } = await fetchMembers();
            if (dataMembers) setMembers(dataMembers);
        })()
    })
    const handleClick = (member) => {
        history.push("/lists/get/" + member.list._id);
    }
    return (
        <MembersTable noedit={true} handleClick={handleClick} handles={{ handleUpdateMember, handleAddMember, handleRemoveMember }} members={members} />
    )
}
export { GetMembers };