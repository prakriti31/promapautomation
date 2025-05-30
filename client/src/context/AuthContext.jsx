import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

/* ---------- tiny helper: check JWT expiry ---------- */
const isExpired = token => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;                     // treat un-parsable token as expired
    }
};

export function AuthProvider({ children }) {
    /* ---------- initial state from localStorage ---------- */
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('user');
        if (!raw || raw === 'undefined') return null;
        try {
            return JSON.parse(raw);
        } catch {
            localStorage.removeItem('user');
            return null;
        }
    });

    /* ---------- login / logout helpers ---------- */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common.Authorization;
        setUser(null);
    };

    const login = async (email, password) => {
        const { data } = await api.post('/login', { email, password });
        const { token, user: u } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(u));
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setUser(u);
        return u;
    };

    /* ---------- one-time startup check: token expiry ---------- */
    useEffect(() => {
        const t = localStorage.getItem('token');
        if (t && isExpired(t)) logout();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
