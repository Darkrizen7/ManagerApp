import { MemberRow, CreateMemberForm } from "components";

const MembersTable = (props) => {
    const { members } = props;
    const { handleUpdateMember, handleRemoveMember, handleAddMember } = props.handles;

    return (
        <>
            {members &&
                <>
                    <h2>Membres</h2>
                    < table >
                        <thead>
                            <tr>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Numéro étudiant</th>
                                <th scope="col">Email</th>
                                <th scope="col">Soutient</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.map(member =>
                                    <MemberRow key={member._id}
                                        member={member}
                                        handleUpdateMember={handleUpdateMember}
                                        handleRemoveMember={handleRemoveMember} />
                                )
                            }
                            <CreateMemberForm handleAddMember={handleAddMember} />
                        </tbody>
                    </table>
                </>
            }
            {
                !members &&
                <h1>Loading Members</h1>
            }
        </>)
}
export { MembersTable };