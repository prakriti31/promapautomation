import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';         // named export in jwt-decode v4+

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    /* ---------- restore user on page-load ---------- */
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            setUser(jwtDecode(token));
        } catch (err) {
            console.warn('⚠️  Bad JWT in localStorage → clearing', err.message);
            localStorage.removeItem('token');   // remove the corrupted value
        }
    }, []);

    /* ---------- helpers ---------- */
    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            setUser(jwtDecode(token));
        } catch (err) {
            // should never happen with a fresh token, but be safe
            console.error('JWT decode failed on login:', err);
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
