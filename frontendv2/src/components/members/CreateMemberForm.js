import { MemberRowForm } from "components";

const CreateMemberForm = (props) => {
    const { handleAddMember } = props;
    return (
        <MemberRowForm member={{}} handleAction={handleAddMember} actionText={"Ajouter"} />
    )
}
export { CreateMemberForm };