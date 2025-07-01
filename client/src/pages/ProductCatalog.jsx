import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';

export default function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [added, setAdded] = useState({});
    const { cart, add, inc, dec } = useCart();

    useEffect(() => {
        api.get('/products').then(r => setProducts(r.data));
    }, []);

    const handleAdd = (p) => {
        add(p);
        setAdded((id) => ({ ...id, [p.id]: true }));
        setTimeout(() => setAdded((id) => ({ ...id, [p.id]: false })), 800);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => {
                    const inCart = cart[p.id];
                    const priceNum = Number(p.price) || 0;
                    return (
                        <div
                            key={p.id}
                            className="fade-in-up bg-white rounded-xl shadow-lg p-4 transition hover:shadow-2xl"
                        >
                            <img
                                src={p.photo_url}
                                alt={p.name}
                                loading="lazy"
                                className="h-48 w-full object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                            <p className="text-base text-gray-700 mb-3 flex items-center">
                                <Rupee className="inline w-5 h-5 mr-1" />
                                {priceNum.toFixed(2)}
                            </p>

                            {inCart ? (
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => dec(p.id)}
                                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                    >
                                        –
                                    </button>
                                    <span className="font-medium">{inCart.qty}</span>
                                    <button
                                        onClick={() => inc(p.id)}
                                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAdd(p)}
                                    className={`w-full rounded py-2 font-semibold text-white transition ${
                                        added[p.id]
                                            ? 'bg-green-500 btn-pulse'
                                            : 'bg-primary-500 hover:bg-primary-600'
                                    }`}
                                >
                                    {added[p.id] ? 'Added!' : 'Add to Cart'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
