import React, { useState } from 'react';
import api from '../api/api';

const categories = ['PLC','Drives','Motors','Power Items','Cables'];

export default function ProductForm({ onSuccess }) {
    const [form, setForm] = useState({ name:'', category:'', description:'', price:'', photos:[null,null,null] });

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handlePhoto = (idx, file) => {
        const photos = [...form.photos];
        photos[idx] = file;
        setForm(f => ({ ...f, photos }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        ['name','category','description','price'].forEach(k => data.append(k, form[k]));
        form.photos.forEach((file, idx) => data.append(`photo${idx+1}`, file));
        await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setForm({ name:'', category:'', description:'', price:'', photos:[null,null,null] });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2 shadow-sm">
            <h2 className="text-xl font-bold">Add Product</h2>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border rounded p-1"
            />
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded p-1"
            >
                <option value="" disabled>Select category</option>
                {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border rounded p-1"
            />
            <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full border rounded p-1"
            />
            {[0, 1, 2].map(i => (
                <input
                    key={i}
                    type="file"
                    accept="image/*"
                    onChange={e => handlePhoto(i, e.target.files[0])}
                    required
                />
            ))}
            <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-1 rounded"
            >
                Save
            </button>
        </form>
    );
}