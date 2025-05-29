import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductEditList from '../components/ProductEditList';
import OrderList from '../components/OrderList';
import api from '../api/api';

export default function AdminDashboard() {
    const [view, setView] = useState('add');
    const [products, setProducts] = useState([]);

    const fetchProducts = () => api.get('/products').then(r => setProducts(r.data));
    useEffect(fetchProducts, []);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex gap-4 mb-4">
                <button onClick={() => setView('add')} className={view==='add' ? 'font-bold' : ''}>
                    Add Product
                </button>
                <button onClick={() => setView('manage')} className={view==='manage' ? 'font-bold' : ''}>
                    Manage Products
                </button>
                <button onClick={() => setView('orders')} className={view==='orders' ? 'font-bold' : ''}>
                    Orders
                </button>
            </div>

            {view === 'add' && (
                <ProductForm onSuccess={fetchProducts} />
            )}

            {view === 'manage' && (
                <ProductEditList products={products} onUpdated={fetchProducts} />
            )}

            {view === 'orders' && (
                <OrderList />
            )}
        </div>
    );
}