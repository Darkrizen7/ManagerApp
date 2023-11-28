import { Link } from "react-router-dom";

import { MembersTable } from "components";
import { createMember, removeMember, updateMember } from "lib/api";
import { PermProtect, usePerm } from "hooks/PermContext";
const ListInfo = (props) => {
    const { list, setList } = props;
    const { hasAccess } = usePerm();

    const handleRemoveMember = async (member) => {
        if (!hasAccess("members.delete", list._id)) { alert("Accès interdit"); return; }
        const { error } = await removeMember(member);
        if (!error) setList({ ...list, members: list.members.filter(mb => mb._id !== member._id) })
    }

    const handleAddMember = async (formData) => {
        if (!hasAccess("members.create", list._id)) return;
        formData.list = list._id;
        const { dataMember, error } = await createMember(formData);
        if (error) {
            return;
        } else if (dataMember) {
            const members = list.members;
            members.push(dataMember);
            setList({ ...list, members })
        }
    }

    const handleUpdateMember = async (formData, setMemberEditing) => {
        if (!hasAccess("members.update", list._id)) return;
        const { dataMember, error } = await updateMember(formData);
        if (error || !dataMember) return;
        setList({
            ...list, members: list.members.map((mb) => {
                return (mb._id === formData._id) ? dataMember : mb
            })
        })
        setMemberEditing(null);
        return
    }
    return (
        <>
            {list &&
                <>
                    <h1>{list.name}</h1>
                    <PermProtect access="transactions.read" listId={list._id} noshow={true}>
                        {list.account} €
                        <Link to={"/transactions/getByList/" + list._id}>Transactions</Link>
                    </PermProtect>
                    <PermProtect access="members.read" listId={list._id} noshow={true}>
                        <MembersTable handles={{ handleUpdateMember, handleAddMember, handleRemoveMember }} list={list} members={list.members} />
                    </PermProtect>

                </>
            }
        </>
    );
}
export { ListInfo }