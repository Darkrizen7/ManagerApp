import { MemberRowForm } from "components";

const CreateMemberForm = (props) => {
    const { handleAddMember } = props;
    return (
        <MemberRowForm member={{ support: false, role: "" }} handleAction={handleAddMember} actionText={"Ajouter"} />
    )
}
export { CreateMemberForm };