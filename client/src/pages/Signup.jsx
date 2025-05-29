import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/signup', { name, email, phone, password });
            const user = await login(email, password);
            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/products');
            }
        } catch {
            alert('Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full border rounded p-2"
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full border rounded p-2"
            />
            <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone"
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
            <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded">
                Sign Up
            </button>
        </form>
    );
}