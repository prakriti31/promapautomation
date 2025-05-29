import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        api.get('/orders').then(r => setOrders(r.data));
    }, []);

    return (
        <div>
            <h2 className="text-2xl mb-4">Orders</h2>
            {orders.map(o => (
                <div key={o.order_id} className="mb-6 border rounded p-4">
                    <h3 className="font-bold">
                        Order {o.order_id} - {new Date(o.created_at).toLocaleString()}
                    </h3>
                    <ul className="mt-2 list-disc list-inside">
                        {o.items.map(item => (
                            <li key={item.product_id}>{item.name} x {item.qty}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}