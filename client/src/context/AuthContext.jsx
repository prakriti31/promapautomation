import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem('token');
        if (typeof t === 'string') {
            try { setUser(jwtDecode(t)); }
            catch { localStorage.removeItem('token'); }
        }
    }, []);

    const login = (t) => {
        if (typeof t !== 'string') return console.error('Invalid token:', t);
        try {
            localStorage.setItem('token', t);
            setUser(jwtDecode(t));
        } catch {
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
