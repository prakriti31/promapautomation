import React, { useState } from 'react';
import api from '../api/api';

/* ————————— category → sub-category map ————————— */
const options = {
    PLC:          ['Siemens PLC', 'ABB PLC', 'Schneider PLC', 'Allen Bradley PLC'],
    Drives:       ['Siemens', 'ABB'],
    Motors:       ['Nord', 'Siemens'],
    'Power Items': ['MCCB', 'MCB'],
    Cables:       [],
    Sensors:      [],
};
const categories = Object.keys(options);

export default function ProductForm({ onSuccess, product = null }) {
    const isEdit = !!product;

    const [form, setForm] = useState({
        name:        product?.name        ?? '',
        category:    product?.category    ?? '',
        subcategory: product?.subcategory ?? '',
        description: product?.description ?? '',
        price:       product?.price       ?? '',
        photo:       null,
    });

    const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const changePhoto = (e) => {
        setForm(f => ({ ...f, photo: e.target.files[0] ?? null }));
    };

    const submit = async e => {
        e.preventDefault();

        try {
            const hasSubcategories = options[form.category]?.length > 0;
            const subcategoryRequired = hasSubcategories && form.category !== 'Sensors' && form.category !== 'Cables';

            if (subcategoryRequired && !form.subcategory) {
                alert('Please select a subcategory.');
                return;
            }

            if (isEdit) {
                await api.put(`/products/${product.id}`, {
                    name:        form.name,
                    category:    form.category,
                    subcategory: subcategoryRequired ? form.subcategory : null,
                    description: form.description,
                    price:       form.price,
                });
            } else {
                const data = new FormData();
                data.append('name', form.name);
                data.append('category', form.category);
                if (subcategoryRequired) {
                    data.append('subcategory', form.subcategory);
                }
                data.append('description', form.description);
                data.append('price', form.price);
                if (form.photo) {
                    data.append('photo1', form.photo);
                }
                await api.post('/products', data);
            }

            onSuccess();

            if (!isEdit) {
                setForm({
                    name: '',
                    category: '',
                    subcategory: '',
                    description: '',
                    price: '',
                    photo: null,
                });
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Error');
        }
    };

    const hasSubcategories = options[form.category]?.length > 0;
    const subcategoryRequired = hasSubcategories && form.category !== 'Sensors' && form.category !== 'Cables';

    return (
        <form onSubmit={submit} className="space-y-4 rounded border p-4">
            <h2 className="text-xl font-bold">{isEdit ? 'Edit Product' : 'Add Product'}</h2>

            <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Name"
                required
                className="w-full rounded border p-2"
            />

            <select
                name="category"
                value={form.category}
                onChange={e => {
                    change(e);
                    setForm(f => ({ ...f, subcategory: '' }));
                }}
                required
                className="w-full rounded border p-2"
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

            {hasSubcategories && (
                <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={change}
                    className="w-full rounded border p-2"
                    required={subcategoryRequired}
                >
                    <option value="" disabled>
                        Select subcategory
                    </option>
                    {options[form.category].map(s => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            )}

            <textarea
                name="description"
                value={form.description}
                onChange={change}
                placeholder="Description"
                required
                className="w-full rounded border p-2"
            />

            <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={change}
                placeholder="Price"
                required
                className="w-full rounded border p-2"
            />

            {!isEdit && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={changePhoto}
                    className="w-full"
                />
            )}

            <button
                type="submit"
                className="rounded bg-primary-500 px-4 py-2 text-white"
            >
                {isEdit ? 'Update' : 'Save'}
            </button>
        </form>
    );
}
