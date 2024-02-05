import { useAuth } from "hooks";
import { API_GetMemberForCurrentUser } from "lib";
import { Member } from "primitives";
import { createContext, useContext, useEffect, useState } from "react";
import { ACCESS, ACCESSType } from 'config/access';

type PermContextType = {
    getRole: () => string;
    getListRole: () => string;
    hasAccess: (access: ACCESSType, listId?: string) => boolean;
    userMember: Member | undefined;
}

const PermContext = createContext<PermContextType>({
    getRole: () => "",
    getListRole: () => "",
    hasAccess: () => false,
    userMember: undefined
});

export const PermProtect = ({ children, access, listId, noshow }:
    { children: React.JSX.Element, access: ACCESSType, listId?: string, noshow?: boolean }) => {
    const { hasAccess } = usePerm();
    if (hasAccess(access, listId)) {
        return children;
    }
    if (noshow) return;
    return <h1>Accès non autorisé</h1>
}

export function PermProvider({ children }: { children: React.JSX.Element }): React.JSX.Element {
    const { user } = useAuth();
    const [userMember, setUserMember] = useState<Member>();
    useEffect(() => {
        (async () => {
            const { data, error } = await API_GetMemberForCurrentUser();
            if (error || !data) return;
            setUserMember(data.member);
        })()
    }, [user]);
    const getRole = () => {
        return user ? user.role : "";
    }
    const getListRole = () => {
        return userMember ? userMember.role : "";
    }
    const hasAccess = (access: ACCESSType, listId?: string) => {
        const splittedAccess = access.split(".");
        var actualAccess = ACCESS.roles[getRole()] ? ACCESS.roles[getRole()] : ACCESS.roles.user
        splittedAccess.every(path => {
            actualAccess = actualAccess[path]
            return actualAccess;
        });
        var hasRoleAccess = actualAccess ? true : false
        actualAccess = ACCESS.listRoles[getListRole()] ? ACCESS.listRoles[getListRole()] : ACCESS.listRoles.user
        var hasListAccess = false;
        if (listId && userMember && userMember.list?._id === listId) {
            splittedAccess.every(path => {
                actualAccess = actualAccess[path]
                return actualAccess;
            });
            hasListAccess = actualAccess ? true : false
        }
        return hasRoleAccess || hasListAccess
    }
    return (
        <PermContext.Provider value={{ getRole, getListRole, hasAccess, userMember }}>
            {children}
        </PermContext.Provider>
    )
}
export function usePerm(): PermContextType {
    return useContext<PermContextType>(PermContext);
}