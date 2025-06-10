import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';

export default function SubcategoryPage() {
    const { category, subcat } = useParams();
    const [items, setItems] = useState([]);
    const [added, setAdded] = useState({});
    const { cart, add, inc, dec } = useCart();

    useEffect(() => {
        api.get('/products').then(r =>
            setItems(
                r.data.filter(
                    p =>
                        p.category === category &&
                        (subcat === 'All' || p.subcategory === subcat)
                )
            )
        );
    }, [category, subcat]);

    const handleAdd = (p) => {
        add(p);
        setAdded((id) => ({ ...id, [p.id]: true }));
        setTimeout(() => setAdded((id) => ({ ...id, [p.id]: false })), 800);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">
                {category} &gt; {subcat}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((p) => {
                    const inCart = cart[p.id];
                    const priceNum = Number(p.price) || 0;
                    return (
                        <div
                            key={p.id}
                            className="fade-in-up bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
                        >
                            <img
                                src={p.photo_url}
                                alt={p.name}
                                className="h-40 w-full object-cover rounded mb-2"
                            />
                            <h3 className="font-bold text-lg">{p.name}</h3>
                            <p className="flex items-center mt-1 mb-3 text-gray-700">
                                <Rupee className="inline w-4 h-4 mr-1" />
                                {priceNum.toFixed(2)}
                            </p>

                            {inCart ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => dec(p.id)}
                                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                                    >
                                        –
                                    </button>
                                    <span>{inCart.qty}</span>
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
                                    className={`w-full rounded py-2 text-white font-semibold transition ${
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
