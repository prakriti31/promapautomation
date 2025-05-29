import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user } = useAuth();

    // not logged in → send to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // logged in but not admin → redirect to main site
    if (adminOnly && user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    // all good → render children
    return children;
}
