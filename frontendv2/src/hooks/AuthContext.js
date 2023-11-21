import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { fetchWrapper } from 'lib/fetchWrapper';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const history = useHistory();
    const cookies = new Cookies();

    useEffect(() => {
        (async () => {
            const tokenToCheck = cookies.get('token');
            if (!tokenToCheck) return;

            const body = { token: tokenToCheck };

            const res = await fetchWrapper.post({ url: "http://localhost:3000/" + "auth/checkToken", body });
            const data = await res.json();

            if (!res.ok || !data.success) {
                return;
            }
            setUser(data.user);
        })();
    }, [])

    const login = async (userData) => {
        const body = userData;
        const res = await fetchWrapper.post({ url: "http://localhost:3000/" + "auth/login", body });
        const data = await res.json();
        if (!res.ok || !data.success) {
            setError(data.message && data.message);
            return;
        }
        setToken(data.token);
        setUser(data.user);
        setError(null);
        cookies.set('token', data.token);
        history.push('/');
    }

    const isConnected = () => {
        if (!user) return false
        return true;
    }

    const logout = () => {
        setUser(null);
        cookies.set('token', null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isConnected, error, token }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };