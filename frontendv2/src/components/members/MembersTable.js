import { MemberRow, CreateMemberForm } from "components";
import { PermProtect, usePerm } from 'hooks/PermContext';

const MembersTable = (props) => {
    const { members, list } = props;
    const { hasAccess } = usePerm();
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
                                        handleRemoveMember={handleRemoveMember} noedit={props.noedit || !hasAccess("members.update", list ? list._id : null)} handleClick={props.handleClick} />
                                )
                            }
                            {!props.noedit &&
                                <PermProtect access="members.create" listId={list ? list._id : null} noshow="true">
                                    <CreateMemberForm handleAddMember={handleAddMember} />
                                </PermProtect>
                            }
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