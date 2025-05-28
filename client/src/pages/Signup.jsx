import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const { login } = useContext(AuthContext);
    const nav       = useNavigate();

    const handle = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/signup', form);
            login(data.token);
            nav('/');
        } catch (err) {
            alert(err.response?.data?.error ?? 'Sign-up error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Create account
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <input
                        name="name"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Name"
                        value={form.name}
                        onChange={handle}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Email"
                        value={form.email}
                        onChange={handle}
                        required
                    />
                    <input
                        name="phone"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handle}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Password"
                        value={form.password}
                        onChange={handle}
                        required
                    />

                    <button className="w-full bg-primary-500 text-white rounded py-2">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
