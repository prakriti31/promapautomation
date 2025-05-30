import React, { useEffect, useState } from 'react';
import api                            from '../api/api';
import { IndianRupee as Rupee }       from 'lucide-react';

export default function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                const { data } = await api.get('/orders');
                setOrders(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error('Could not fetch orders', e);
                setOrders([]);
            }
        }
        load();
    }, []);

    if (!orders.length)
        return <p className="text-sm text-gray-500">No orders yet.</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Orders</h2>

            {orders.map(o => (
                <div key={o.id} className="rounded border p-4 shadow-sm">
                    <h3 className="mb-1 font-semibold">
                        Order&nbsp;#{o.id} – {new Date(o.created_at).toLocaleString()}
                    </h3>

                    {/* customer info */}
                    <p className="mb-2 text-sm text-gray-700 leading-snug">
                        Placed&nbsp;by:&nbsp;
                        <span className="font-medium">{o.user_name ?? '—'}</span>
                        &nbsp;(User&nbsp;ID:&nbsp;{o.user_id ?? 'N/A'})
                        <br />
                        Email:&nbsp;{o.user_email ?? '—'}&nbsp;&nbsp;|&nbsp;&nbsp;
                        Phone:&nbsp;{o.user_phone ?? '—'}
                    </p>

                    <table className="mb-3 w-full text-sm">
                        <thead>
                        <tr className="border-b text-left">
                            <th className="py-1">Product</th>
                            <th className="py-1">Qty</th>
                            <th className="py-1">Unit&nbsp;Price</th>
                            <th className="py-1">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {o.items.map(it => (
                            <tr key={it.product_id} className="border-b last:border-0">
                                <td className="py-1">{it.name}</td>
                                <td className="py-1">{it.qty}</td>
                                <td className="py-1">
                                    <Rupee className="inline h-4 w-4" />
                                    {it.price}
                                </td>
                                <td className="py-1">
                                    <Rupee className="inline h-4 w-4" />
                                    {(it.qty * it.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="text-right font-bold">
                        Total:&nbsp;
                        <Rupee className="inline h-4 w-4" />
                        {o.total}
                    </div>
                </div>
            ))}
        </div>
    );
}
