import { useEffect, useState } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginPrompt from '../components/LoginPrompt';

export default function ProductCatalog({ initialCategory = null }) {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(initialCategory);
    const [showPrompt, setShowPrompt] = useState(false);

    const { cart, add, inc, dec } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        api.get('/products').then(r => setProducts(r.data));
    }, []);

    const categories = [...new Set(products.map(p => p.category))];

    /* ---------- add-to-cart with login check ---------- */
    const handleAdd = product => {
        if (!user) {
            setShowPrompt(true);
        } else {
            add(product);
        }
    };

    return (
        <div className="mx-auto max-w-6xl p-4">
            {/* category pills */}
            <div className="mb-6 flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelected(selected === cat ? null : cat)}
                        className={`rounded-full px-4 py-1 text-sm ${
                            selected === cat
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* product grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {products
                    .filter(p => !selected || p.category === selected)
                    .map(p => {
                        const item = cart[p.id];
                        return (
                            <div key={p.id} className="rounded-2xl border p-4 shadow-sm">
                                <img
                                    src={p.photo_url}
                                    alt={p.name}
                                    className="mb-2 h-40 w-full rounded object-cover"
                                />
                                <h3 className="text-lg font-bold">{p.name}</h3>
                                <p className="mb-2">&#8377;{p.price}</p>

                                {item ? (
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => dec(p.id)}
                                            className="rounded border px-2"
                                        >
                                            –
                                        </button>
                                        <span>{item.qty}</span>
                                        <button
                                            onClick={() => inc(p.id)}
                                            className="rounded border px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAdd(p)}
                                        className="rounded bg-primary-500 px-3 py-1 text-white"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>

            {/* login prompt */}
            {showPrompt && <LoginPrompt onClose={() => setShowPrompt(false)} />}
        </div>
    );
}
