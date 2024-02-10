import { MembersTable } from "components";
import { usePerm } from "hooks";
import { API_DownloadMembers, API_EditMember, API_GetMembers, API_RemoveMember } from "lib";
import { Member } from "primitives";
import { useEffect, useState } from "react";

export const MembersController = (): React.JSX.Element => {
    const [members, setMembers] = useState<Member[]>([]);
    const { hasAccess } = usePerm();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetMembers();
            if (error || !data) { return; }
            setMembers(data.members);
        })()
    }, [])
    const onMemberEdited = async (member: Member): Promise<boolean> => {
        if (!hasAccess("members.update", member.list?._id)) return false;
        const { data, error } = await API_EditMember(member);
        if (error || !data) { window.confirm(error?.message); return false; }
        setMembers([data.member, ...members.filter(m => m._id != data.member._id)])
        return true;
    }
    const onMemberDeleted = async (member: Member): Promise<boolean> => {
        if (!hasAccess("members.delete", member.list?._id)) return false;
        const { error } = await API_RemoveMember(member);
        if (error) { window.confirm(error?.message); return false; }
        setMembers(members.filter(m => m._id != member._id))
        return true;
    }
    // const onMemberAdded = async (member: Member): Promise<boolean> => {
    //     if (!hasAccess("members.create", list._id)) return false;
    //     const { data, error } = await API_CreateMember(member);
    //     if (error || !data) { window.confirm(error?.message); return false; }
    //     setList({
    //         ...list, members: [data.member, ...list.members],
    //     })
    //     return true;
    // }
    const handleDownload = async (): Promise<boolean> => {
        const { error } = await API_DownloadMembers();
        if (!error) return false;
        return true
    }
    return (
        <>
            {hasAccess("members.read") &&
                <>
                    <button onClick={handleDownload}>Télécharger</button>
                    <MembersTable members={members}
                        onMemberEdited={onMemberEdited}
                        onMemberDeleted={onMemberDeleted}
                        accessEdit={hasAccess("members.update")}
                        accessDelete={hasAccess("members.delete")} />
                </>
            }
        </>
    )
}