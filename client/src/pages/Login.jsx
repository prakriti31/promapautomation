import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } catch {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold">Login</h2>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full border rounded p-2"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full border rounded p-2"
            />
            <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 rounded"
            >
                Log In
            </button>
        </form>
    );
}