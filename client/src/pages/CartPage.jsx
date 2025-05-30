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
        alert('Your request has been received, you will be contacted soon.');
        setPlacing(false);
    };

    if (countTypes === 0)
        return <p className="p-8 text-center">Cart is empty.</p>;

    return (
        <div className="mx-auto max-w-4xl space-y-4 p-4">
            {/* NEW: quick navigation back home */}
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
                            <button onClick={() => dec(product.id)} className="rounded border px-2">
                                –
                            </button>
                            <span>{qty}</span>
                            <button onClick={() => inc(product.id)} className="rounded border px-2">
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
                className="float-right rounded bg-primary-600 px-6 py-2 text-white"
            >
                {placing ? 'Placing…' : 'Place Order'}
            </button>
        </div>
    );
}
