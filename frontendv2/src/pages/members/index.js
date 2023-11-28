import { useEffect, useState } from "react";

import { MembersTable } from "components";
import { useHistory } from "react-router-dom";
import { fetchMembers, removeMember } from "lib/api";
import { usePerm } from "hooks/PermContext";
const GetMembers = () => {
    const [members, setMembers] = useState(null);
    const history = useHistory();
    const { hasAccess } = usePerm();

    const handleUpdateMember = () => { }
    const handleAddMember = () => { }

    const handleRemoveMember = async (member, setPending) => {
        if (!hasAccess("members.delete", member.list ? member.list._id : null)) { alert("Accès interdit"); return; }
        if (setPending) setPending(true);
        const { error } = await removeMember(member);
        if (!error) setMembers(members.filter(mb => mb._id !== member._id))
        if (setPending) setPending(false)
    }

    useEffect(() => {
        (async () => {
            const { dataMembers } = await fetchMembers();
            if (dataMembers) setMembers(dataMembers);
        })()
    }, [])

    const handleClick = (member) => {
        history.push("/lists/get/" + member.list._id);
    }

    return (
        <MembersTable noedit={true} handleClick={handleClick} handles={{ handleUpdateMember, handleAddMember, handleRemoveMember }} members={members} />
    )
}
export { GetMembers };