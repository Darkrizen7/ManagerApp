import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getMemberForCurrentUser } from 'lib/api';
import { ACCESS } from 'config/access';

const PermContext = createContext();

const PermProtect = ({ children, access, listId, noshow }) => {
    const { hasAccess } = usePerm();
    if (hasAccess(access, listId)) {
        return children;
    }
    if (noshow) return;
    return <h1>Accès non autorisé</h1>
}
const PermProvider = ({ children }) => {
    const { user } = useAuth();
    const [userMember, setUserMember] = useState(null);
    useEffect(() => {
        (async () => {
            const { dataMember, error } = await getMemberForCurrentUser();
            if (error) return;
            if (dataMember) {
                setUserMember(dataMember)
            }
        })()
    }, [user]);

    const getRole = () => {
        return user ? user.role : "";
    }
    const getListRole = () => {
        return userMember ? userMember.role : "";
    }
    const hasAccess = (access, listId) => {
        const splittedAccess = access.split(".");
        var actualAccess = ACCESS.roles[getRole()] ? ACCESS.roles[getRole()] : ACCESS.roles.user
        splittedAccess.every(path => {
            actualAccess = actualAccess[path]
            return actualAccess;
        });
        var hasRoleAccess = actualAccess ? true : false
        var actualAccess = ACCESS.listRoles[getListRole()] ? ACCESS.listRoles[getListRole()] : ACCESS.listRoles.user
        var hasListAccess = false;
        if (listId && userMember && (listId === userMember.list._id)) {
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

const usePerm = () => {
    return useContext(PermContext);
}

export { PermProtect, PermProvider, usePerm };