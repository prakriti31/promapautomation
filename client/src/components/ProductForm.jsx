import React, { useState } from 'react';
import api from '../api/api';

const categories = ['PLC', 'Drives', 'Motors', 'Power Items', 'Cables'];

export default function ProductForm({ onSuccess, product = null }) {
    const isEdit = Boolean(product);
    const [form, setForm] = useState({
        name:        product?.name        || '',
        category:    product?.category    || '',
        description: product?.description || '',
        price:       product?.price       || '',
        photos: [null, null, null],
    });

    const handleChange = e =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handlePhoto = (idx, file) => {
        const photos = [...form.photos];
        photos[idx] = file;
        setForm(f => ({ ...f, photos }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isEdit) {
                // JSON body when editing (no photos)
                await api.put(`/products/${product.id}`, {
                    name: form.name,
                    category: form.category,
                    description: form.description,
                    price: form.price,
                });
            } else {
                // FormData (0-3 photos) when creating
                const data = new FormData();
                ['name', 'category', 'description', 'price'].forEach(k =>
                    data.append(k, form[k]),
                );
                form.photos.forEach((file, i) => {
                    if (file) data.append(`photo${i + 1}`, file);
                });

                // ⚠️ DO *NOT* set Content-Type manually!
                await api.post('/products', data);
            }

            onSuccess();
            if (!isEdit) {
                setForm({
                    name: '',
                    category: '',
                    description: '',
                    price: '',
                    photos: [null, null, null],
                });
            }
        } catch (err) {
            alert(
                err.response?.data?.error ||
                'Upload failed (check PHP size limits and file sizes)',
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded space-y-4">
            <h2 className="text-xl font-bold">
                {isEdit ? 'Edit Product' : 'Add Product'}
            </h2>

            {/* ── text inputs ────────────────────────────────── */}
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border rounded p-2"
            />
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
            >
                <option value="" disabled>
                    Select category
                </option>
                {categories.map(c => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border rounded p-2"
            />
            <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full border rounded p-2"
            />

            {/* ── optional photos when *creating* ─────────────── */}
            {!isEdit &&
                [0, 1, 2].map(i => (
                    <input
                        key={i}
                        type="file"
                        accept="image/*"
                        onChange={e => handlePhoto(i, e.target.files[0])}
                        className="w-full"
                    />
                ))}

            <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded"
            >
                {isEdit ? 'Update Product' : 'Save Product'}
            </button>
        </form>
    );
}
