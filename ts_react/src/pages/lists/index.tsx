import { ListForm, ListsTable, ViewList } from "components";
import { usePerm } from "hooks";
import { API_CreateMember, API_EditMember, API_RemoveMember } from "lib";
import { API_CreateList, API_DeleteList, API_GetList, API_GetLists, API_UpdateList } from "lib/api";
import { List, Member } from "primitives";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ListsController = (): React.JSX.Element => {
    const [lists, setLists] = useState<List[]>([]);
    const { hasAccess } = usePerm();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetLists();
            console.log(data, error);
            if (error || !data) { return; }
            setLists(data.lists);
        })()
    }, [])
    const onSubmit = async (formData: any): Promise<void> => {
        const { data, error } = await API_CreateList(formData);
        if (error || !data) { window.confirm(error?.message); return; }
        setLists([data.list, ...lists])
    }
    const onDelete = async (list: List) => {
        if (!window.confirm("Voulez-vous supprimer la liste?")) return
        const { data, error } = await API_DeleteList(list);
        if (error || !data) { window.confirm(error?.message); return; }
        setLists(lists.filter((l) => l._id !== list._id));
    }
    const onUpdate = async (list: List): Promise<boolean> => {
        const { data, error } = await API_UpdateList(list);
        if (error || !data) { window.confirm(error?.message); return false; }
        setLists(lists.map((l) => { if (l._id === list._id) { return data.list } return l }))
        return true
    }
    return (<>
        {hasAccess("lists.read") &&
            <>
                <ListsTable
                    lists={lists}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    allowEdit={hasAccess("lists.update")}
                    allowDelete={hasAccess("lists.delete")} />
                <ListForm onSubmit={onSubmit} headerText={"Création d'une liste"} actionText={"Créer"}></ListForm>
            </>
        }
    </>)
}

export const ListController = (): React.JSX.Element => {
    const { _id } = useParams();
    const [list, setList] = useState<List>(new List({ _id }));
    const { hasAccess } = usePerm();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetList(_id ? _id : "mine");
            if (error || !data) { return; }
            setList(data.list as List);
        })()
    }, [_id])
    const onMemberEdited = async (member: Member): Promise<boolean> => {
        if (!hasAccess("members.update", list._id)) return false;
        const { data, error } = await API_EditMember(member);
        if (error || !data) { window.confirm(error?.message); return false; }
        setList({
            ...list, members: list.members.map((m) => {
                if (m._id === data.member._id) return member;
                return m
            })
        })
        return true;
    }
    const onMemberDeleted = async (member: Member): Promise<boolean> => {
        if (!hasAccess("members.delete", list._id)) return false;
        const { error } = await API_RemoveMember(member);
        if (error) { window.confirm(error?.message); return false; }
        setList({
            ...list, members: list.members.filter((mb) => (mb._id !== member._id))
        })
        return true;
    }
    const onMemberAdded = async (member: Member): Promise<boolean> => {
        if (!hasAccess("members.create", list._id)) return false;
        const { data, error } = await API_CreateMember(member);
        if (error || !data) { window.confirm(error?.message); return false; }
        setList({
            ...list, members: [data.member, ...list.members],
        })
        // window.confirm("Veuillez noter le mot de passe celui ci ne pourra pas être redonner: " + data.new_password + " NB: que pour les trésoriers & respos démarchages");
        return true;
    }
    return (
        <>
            {hasAccess("lists.readOne", list._id) &&
                <ViewList list={list}
                    onMemberEdited={onMemberEdited}
                    onMemberDeleted={onMemberDeleted}
                    onMemberAdded={onMemberAdded} />
            }
        </>
    )
}
