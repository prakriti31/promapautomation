import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { IndianRupee as Rupee } from 'lucide-react';
import LoginPrompt from '../components/LoginPrompt';

export default function SubcategoryPage() {
    const { category, subcat } = useParams();
    const [items, setItems] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);

    const { cart, add, inc, dec } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        api.get('/products').then(r =>
            setItems(
                r.data.filter(
                    p =>
                        p.category === category &&
                        (subcat === 'All' || p.subcategory === subcat),
                ),
            ),
        );
    }, [category, subcat]);

    const handleAdd = p => {
        if (!user) setShowPrompt(true);
        else add(p);
    };

    return (
        <div className="mx-auto max-w-6xl px-4">
            <h2 className="py-4 text-xl font-semibold">
                {category} &gt; {subcat}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {items.map(p => {
                    const item = cart[p.id];
                    return (
                        <div key={p.id} className="rounded-xl border p-3 shadow-sm">
                            <img
                                src={p.photo_url}
                                alt={p.name}
                                className="h-40 w-full rounded object-cover"
                            />
                            <h3 className="mt-2 font-bold">{p.name}</h3>
                            <p className="flex items-center gap-1 text-primary-800">
                                <Rupee className="h-4 w-4" />
                                {p.price}
                            </p>

                            {item ? (
                                <div className="mt-2 flex items-center gap-2">
                                    <button onClick={() => dec(p.id)} className="rounded border px-2">
                                        –
                                    </button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => inc(p.id)} className="rounded border px-2">
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAdd(p)}
                                    className="mt-2 w-full rounded bg-primary-500 px-3 py-1 text-white"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {showPrompt && <LoginPrompt onClose={() => setShowPrompt(false)} />}
        </div>
    );
}
