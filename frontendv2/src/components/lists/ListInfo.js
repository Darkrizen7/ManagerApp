import { Link } from "react-router-dom";

import { MembersTable } from "components";
import { fetchWrapper } from "lib/fetchWrapper";
const ListInfo = (props) => {
    const { list, setList } = props;

    const handleRemoveMember = async (member, setPending) => {
        setPending(true);
        const body = member;
        const res = await fetchWrapper.delete({ url: "http://localhost:3000/members", body });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setPending(false);
            return;
        }
        setList({ ...list, members: list.members.filter(mb => mb._id !== member._id) })
        setPending(false);
    }

    const handleAddMember = async (formData, setPending) => {
        setPending(true);
        const body = formData;
        body.list = list._id;

        const res = await fetchWrapper.post({ url: "http://localhost:3000/members", body });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setPending(false);
            return;
        }
        const members = list.members;
        members.push(data.member);

        setList({ ...list, members })
        setPending(false);
    }

    const handleUpdateMember = async (formData, setPending, setError, setIsEditing) => {
        setPending(true);

        const body = formData;
        const res = await fetchWrapper.put({ url: "http://localhost:3000/members", body });
        const data = await res.json();

        if (!res.ok || !data.success) {
            setError(data.message);
            setPending(false);
            return;
        }

        setPending(false);
        setIsEditing(false);
        setList({
            ...list, members: list.members.map((mb) => {
                return (mb._id === formData._id) ? data.member : mb
            })
        })

    }
    return (
        <>
            {list &&
                <>
                    <h1>{list.name}</h1>
                    {list.account} €
                    <Link to={"/transactions/getByList/" + list._id}>Transactions</Link>
                    <MembersTable handles={{ handleUpdateMember, handleAddMember, handleRemoveMember }} members={list.members} />
                </>
            }
        </>
    );
}
export { ListInfo }