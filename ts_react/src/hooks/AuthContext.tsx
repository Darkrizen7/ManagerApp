import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from 'react-router-dom';

import Cookies from "universal-cookie";

import { User } from "primitives";
import { API_Login, API_TokenLogin } from "lib";

type AuthContextType = {
    user: User | undefined | null,
    error: Error | undefined | null,
    login: (userData: User) => void,
    logout: () => void,
    isConnected: () => boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    error: null,
    login: () => { },
    logout: () => { },
    isConnected: () => false
});

export function AuthProvider({ children }: { children: React.JSX.Element }): JSX.Element {
    const [user, setUser] = useState<User | null>();
    const [error, setError] = useState<Error | null>();

    const cookies = useMemo(() => {
        return new Cookies();
    }, []);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = cookies.get('token');
            if (!token) return;
            const { data, error } = await API_TokenLogin(token);
            if (error || !data) { cookies.set('token', null); return; }
            setUser(data.user);
        })();
    }, [cookies]);

    const login = async (userData: User) => {
        const { data, error } = await API_Login(userData);
        if (error || !data) { setError(error); return; }
        setUser(data.user);
        setError(null);
        cookies.set('token', data.token);
        navigate('/');
    }
    const logout = () => {
        setUser(null);
        cookies.set('token', null);
    }
    const isConnected = () => {
        if (!user) return false;
        return true;
    }
    return (
        <>
            <AuthContext.Provider value={{ user, error, login, logout, isConnected }}>
                {children}
            </AuthContext.Provider>
        </>)
}

export function useAuth(): AuthContextType {
    return useContext<AuthContextType>(AuthContext);
}
