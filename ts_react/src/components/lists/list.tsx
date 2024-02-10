import { MemberForm, MembersTable } from "components"
import { usePerm } from "hooks"
import { List, Member, Transaction } from "primitives"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

type IProps = {
    list: List,
    onMemberEdited: (member: Member) => Promise<boolean>,
    onMemberDeleted: (member: Member) => Promise<boolean>,
    onMemberAdded: (member: Member) => Promise<boolean>,
}
export const ViewList = ({ list, onMemberAdded, onMemberDeleted, onMemberEdited }: IProps): React.JSX.Element => {
    const { hasAccess } = usePerm();
    const [amountApproved, setAmountApproved] = useState<number>(0);
    const [amountNonApproved, setAmountNonApproved] = useState<number>(0);
    useEffect(() => {
        const aTrs = [0, ...list.transactions.filter((t: Transaction) => t.approved).map((tr: Transaction) => tr.amount)];
        const naTrs = [0, ...list.transactions.map((tr: Transaction) => tr.amount)];
        setAmountApproved(aTrs.reduce((vl: number, newVl: number) => vl += newVl));
        setAmountNonApproved(naTrs.reduce((vl: number, newVl: number) => vl += newVl));
    }, [list])
    return (<>
        <h1>{list.pre_name} - {list.name}</h1>
        {hasAccess("transactions.read", list._id) &&
            <NavLink to={"/transactions/" + list._id}>Transactions</NavLink>
        }
        <p>{list.members.filter((m: Member) => !m.support).length} / 30 membres officiels</p>
        <p>{list.members.filter((m: Member) => m.support).length} / 8 soutiens</p>
        {/* <p>Solde : {amountApproved}€</p> */}
        {/* <p>Solde prévisionnel (non approuvé) : {amountNonApproved}€</p> */}

        {hasAccess("members.read", list._id) &&
            <MembersTable members={list.members}
                onMemberEdited={onMemberEdited}
                onMemberDeleted={onMemberDeleted}
                accessEdit={hasAccess("members.update", list._id)}
                accessDelete={hasAccess("members.delete", list._id)} />
        }
        {hasAccess("members.create", list._id) &&
            <MemberForm member={new Member({ list })} onSubmit={onMemberAdded} headerText={"Ajouter un membre"} actionText={"Ajouter"} />
        }
        {/* <ListForm list={list} onSubmit={(data) => {
                console.log(data);
            }} headerText={"Modification d'une liste"} actionText={"Modifier"}></ListForm> */}
    </>)
}