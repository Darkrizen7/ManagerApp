import { MemberForm } from "components";

const EditMemberForm = (props) => {
    const { handleUpdateMember, member } = props;
    return (
        <MemberForm member={member} handleAction={handleUpdateMember} actionText={"Sauvegarder"} />
    )
}
export { EditMemberForm };