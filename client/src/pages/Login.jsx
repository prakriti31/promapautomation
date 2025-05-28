import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    const nav       = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/login', { email, password });
            login(data.token);
            nav('/');
        } catch (err) {
            alert(err.response?.data?.error ?? 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign in</h1>

                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="w-full bg-primary-500 text-white rounded py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
