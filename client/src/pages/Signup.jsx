import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const { user, login } = useAuth();
    if (user) return <Navigate to="/" replace />;     // block if already logged-in

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/signup', { name, email, phone, password });
            await login(email, password);
            navigate('/');                                 // landing page
        } catch {
            alert('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-sm space-y-4 p-4">
            <h2 className="text-2xl font-bold">Sign&nbsp;Up</h2>

            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full rounded border p-2"
            />

            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full rounded border p-2"
            />

            <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone"
                required
                className="w-full rounded border p-2"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded border p-2"
            />

            <button type="submit" className="w-full rounded bg-primary-500 py-2 text-white">
                Sign&nbsp;Up
            </button>

            {/* convenience link back to Login */}
            <p className="text-center text-sm">
                Already registered?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:underline">
                    Log&nbsp;In
                </Link>
            </p>
        </form>
    );
}
