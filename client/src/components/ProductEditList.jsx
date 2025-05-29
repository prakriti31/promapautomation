import React, { useState } from 'react';
import ProductForm from './ProductForm';
import api from '../api/api';

export default function ProductEditList({ products, onUpdated }) {
    const [editingId, setEditingId] = useState(null);

    const handleDelete = async id => {
        if (confirm('Delete this product?')) {
            await api.delete(`/products/${id}`);
            onUpdated();
        }
    };

    const editingProduct = products.find(p => p.id === editingId);

    return (
        <div>
            <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(p => (
                    <tr key={p.id} className="border-t">
                        <td className="px-4 py-2">{p.name}</td>
                        <td className="px-4 py-2">{p.category}</td>
                        <td className="px-4 py-2">${p.price}</td>
                        <td className="px-4 py-2 space-x-2">
                            <button onClick={() => setEditingId(p.id)} className="text-blue-600">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="text-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingProduct && (
                <div className="mt-6">
                    <ProductForm
                        product={editingProduct}
                        onSuccess={() => { onUpdated(); setEditingId(null); }}
                    />
                </div>
            )}
        </div>
    );
}