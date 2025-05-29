import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import OrderList from '../components/OrderList';
import api from '../api/api';

export default function AdminDashboard() {
    const [view, setView] = useState('products');
    const [products, setProducts] = useState([]);

    const fetchProducts = () => api.get('/products').then(r => setProducts(r.data));
    useEffect(fetchProducts, []);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex gap-4 mb-4">
                <button onClick={() => setView('products')} className={view==='products'?'font-bold':''}>Products</button>
                <button onClick={() => setView('orders')} className={view==='orders'?'font-bold':''}>Orders</button>
            </div>
            {view === 'products' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductForm onSuccess={fetchProducts} />
                    {products.map(p => (
                        <div key={p.id} className="border rounded p-4 shadow-sm">
                            <img src={p.photo_url} alt={p.name} className="h-32 w-full object-cover mb-2"/>
                            <h3 className="font-bold">{p.name}</h3>
                            <p>${p.price}</p>
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => api.delete(`/products/${p.id}`).then(fetchProducts)} className="text-red-500">Delete</button>
                                <button onClick={() => {/* implement edit */}}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {view === 'orders' && <OrderList />}
        </div>
    );
}