import { MemberForm } from "components";

const CreateMemberForm = (props) => {
    const { handleAddMember } = props;
    return (
        <MemberForm member={{ support: false, role: "" }} handleAction={handleAddMember} actionText={"Ajouter"} />
    )
}
export { CreateMemberForm };