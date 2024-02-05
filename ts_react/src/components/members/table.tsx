import { Table } from "components/table";
import { Member } from "primitives";
import { useState } from "react";
import { MemberForm } from "./forms";

type IProps = {
    members: Member[],
    onMemberEdited: (member: Member) => Promise<boolean>,
    onMemberDeleted: (member: Member) => Promise<boolean>,
    accessEdit: boolean,
    accessDelete: boolean,
}
export const MembersTable = ({ members, onMemberEdited, onMemberDeleted, accessEdit, accessDelete }: IProps): React.JSX.Element => {
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
                { accessorKey: 'support', header: "Soutien", cell: (info: { getValue: () => boolean }) => (info.getValue() ? "Oui" : "Non"), filterFn: 'bool' },
                { accessorKey: 'role', header: "Rôle" },
            ],
        },
        {
            header: 'Actions',
            columns: [
                {
                    header: 'Retirer', cell: (info: any) => {
                        if (!accessDelete) return (<></>);
                        return (<button onClick={() => onMemberRemoveButton(info.row.original as Member)}>Retirer</button>)
                    }
                },
                {
                    header: 'Modifier', cell: (info: any) => {
                        if (!accessEdit) return (<></>);
                        return (<button onClick={() => onMemberEditButton(info.row.original as Member)}>Modifier</button>)
                    }
                }
            ]
        },
    ]

    const [isEditing, setIsEditing] = useState(false);
    const [memberEditing, setMemberEditing] = useState<Member>();

    const onMemberRemoveButton = async (member: Member): Promise<void> => {
        if (window.confirm("Voulez-vous supprimer le membre?")) {
            await onMemberDeleted(member);
        }
    }
    const onMemberEditButton = (member: Member): void => {
        setIsEditing(true);
        setMemberEditing(member);
    }
    const onSubmit = async (data: any): Promise<void> => {
        const memberEdited = await onMemberEdited(data);
        if (memberEdited) setIsEditing(false);
    }

    return (
        <>
            <Table<Member> columns={columns} data={members} />
            {isEditing && accessEdit &&
                <MemberForm member={memberEditing} onSubmit={onSubmit} headerText={"Modifier le membre"} actionText={"Modifier"} />
            }
        </>
    )
}