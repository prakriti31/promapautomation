import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';

export default function CartPage() {
    const { cart, inc, dec, clear, total, countTypes } = useCart();
    const { user } = useAuth();
    const [placing, setPlacing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const items = Object.values(cart);

    const placeOrder = async () => {
        setPlacing(true);
        await api.post('/orders', {
            user_id: user.id,
            customer_email: user.email,
            total,
            items: items.map(({ product, qty }) => ({
                product_id: product.id,
                qty,
                price: product.price,
                name: product.name,
            })),
        });
        clear();
        setPlacing(false);
        setShowSuccess(true);
    };

    if (countTypes === 0 && !showSuccess)
        return <p className="p-8 text-center">Cart is empty.</p>;

    return (
        <div className="relative mx-auto max-w-4xl space-y-4 p-4">
            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="animate-pop rounded-lg bg-white p-6 text-center shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-2 text-green-700">
                            🎉 Order Placed!
                        </h2>
                        <p className="mb-4">
                            Your request has been received. You will be contacted soon.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div>
                <Link
                    to="/"
                    className="rounded bg-primary-100 px-3 py-1 text-sm hover:bg-primary-200"
                >
                    ⟵ Home
                </Link>
            </div>

            {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 border-b pb-3">
                    <img
                        src={product.photo_url}
                        alt={product.name}
                        className="h-24 w-24 rounded object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="flex items-center gap-1">
                            <Rupee className="h-4 w-4" />
                            {product.price}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            <button
                                onClick={() => dec(product.id)}
                                className="rounded border px-2"
                            >
                                –
                            </button>
                            <span>{qty}</span>
                            <button
                                onClick={() => inc(product.id)}
                                className="rounded border px-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-right text-lg font-bold">
                Total:&nbsp;
                <Rupee className="inline h-4 w-4" />
                {total}
            </div>

            <button
                disabled={placing}
                onClick={placeOrder}
                className="float-right rounded bg-primary-600 px-6 py-2 text-white disabled:opacity-50"
            >
                {placing ? 'Placing…' : 'Place Order'}
            </button>
        </div>
    );
}
