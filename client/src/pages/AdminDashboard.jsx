import React, { useEffect, useState } from 'react';
import ProductForm      from '../components/ProductForm';
import ProductEditList  from '../components/ProductEditList';
import OrderList        from '../components/OrderList';
import api              from '../api/api';

export default function AdminDashboard() {
    const [view, setView]   = useState('add');
    const [products, setProducts] = useState([]);

    /* ---- fetch once, no Promise returned to React ---- */
    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (err) {
                console.error('Failed loading products', err);
            }
        }
        fetchProducts();
    }, []);

    /* so children can re-load after a CRUD action */
    const refreshProducts = async () => {
        const { data } = await api.get('/products');
        setProducts(data);
    };

    return (
        <div className="mx-auto max-w-6xl p-4">
            <div className="mb-4 flex gap-4">
                <button onClick={() => setView('add')}    className={view === 'add'    ? 'font-bold' : ''}>Add&nbsp;Product</button>
                <button onClick={() => setView('manage')} className={view === 'manage' ? 'font-bold' : ''}>Manage&nbsp;Products</button>
                <button onClick={() => setView('orders')} className={view === 'orders' ? 'font-bold' : ''}>Orders</button>
            </div>

            {view === 'add'    && <ProductForm                    onSuccess={refreshProducts} />}
            {view === 'manage' && <ProductEditList products={products} onUpdated={refreshProducts} />}
            {view === 'orders' && <OrderList />}
        </div>
    );
}
