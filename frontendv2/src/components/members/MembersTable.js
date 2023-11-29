import { useState, useEffect } from 'react';

import { PermProtect } from 'hooks/PermContext';
import { CreateMemberForm, EditMemberForm } from 'components';
import { Table } from 'components';

const MembersTable = (props) => {
    const { members, list, noEdit } = props;
    const { handleUpdateMember, handleRemoveMember, handleAddMember } = props.handles;
    const [memberEditing, setMemberEditing] = useState();

    const columns = [
        {
            header: 'Name',
            columns: [
                { accessorKey: 'surname', header: 'Prénom' },
                { accessorKey: 'lastname', header: 'Nom' },
            ],
        },
        {
            header: 'Info',
            columns: [
                { accessorKey: 'list.name', header: 'Liste' },
                { accessorKey: 'student_number', header: 'Numéro étudiant' },
                { accessorKey: 'email', header: "Email" },
                { accessorKey: 'support', header: "Soutien", cell: info => (info.getValue() ? "Oui" : "Non"), filterFn: 'bool' },
                { accessorKey: 'role', header: "Rôle" },
            ],
        },
        {
            header: 'Actions',
            columns: [
                {
                    header: 'Retirer', cell: info => {
                        return (
                            <PermProtect access={"members.delete"} listId={info.row.original.list} noshow={true}>
                                <button className="submit"
                                    type="submit"
                                    onClick={() => { handleRemoveMember(info.row.original) }}>Retirer</button>
                            </PermProtect>);
                    }
                },
                {
                    header: 'Modifier', cell: info => {
                        return (
                            <PermProtect access={"members.update"} listId={info.row.original.list} noshow={true}>
                                <button className="submit"
                                    type="submit"
                                    onClick={() => { if (memberEditing && memberEditing === info.row.original) return setMemberEditing(null); setMemberEditing(info.row.original); }}
                                >
                                    Modifier
                                </button>
                            </PermProtect>
                        );
                    }
                }
            ]
        },
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!members) return;
        setData(members);
    }, [members]);

    return (
        <>
            <Table columns={columns} data={data} />
            {!noEdit &&
                <>
                    {!memberEditing &&
                        <PermProtect access="members.create" listId={list ? list._id : null} noshow="true">
                            <CreateMemberForm handleAddMember={handleAddMember} />
                        </PermProtect>
                    }
                    {memberEditing &&
                        <PermProtect access="members.update" listId={list ? list._id : null} noshow="true">
                            <EditMemberForm member={memberEditing} handleUpdateMember={(data) => { handleUpdateMember(data, setMemberEditing) }} />
                        </PermProtect>
                    }
                </>
            }
        </>
    );
};

export { MembersTable };
