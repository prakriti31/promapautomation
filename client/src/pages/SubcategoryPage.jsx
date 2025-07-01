import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';
import LoginPrompt from '../components/LoginPrompt';
import CategoryNavbar from '../components/CategoryNavbar';

export default function SubcategoryPage() {
    const { category, subcat } = useParams();
    const [items, setItems] = useState([]);
    const [added, setAdded] = useState({});
    const { cart, add, inc, dec } = useCart();

    const isLoggedIn = !!localStorage.getItem('user');

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
        toast.success(`${p.name} added to cart!`);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
            setAdded((id) => ({ ...id, [p.id]: false }));
        }, 800);
    };

    return (
        <div className="relative min-h-screen bg-primary-50 text-primary-900">
            <CategoryNavbar />
            {!isLoggedIn && <LoginPrompt />}
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

                                {isLoggedIn ? (
                                    inCart ? (
                                        <div className="flex items-center justify-between w-full h-10">
                                            <button
                                                onClick={() => dec(p.id)}
                                                className="w-1/3 h-full rounded-l bg-primary-200 hover:bg-primary-300 transition text-primary-900 font-bold text-xl"
                                            >
                                                –
                                            </button>
                                            <div className="w-1/3 h-full flex items-center justify-center bg-primary-100 text-primary-900 font-semibold text-lg">
                                                {inCart.qty}
                                            </div>
                                            <button
                                                onClick={() => inc(p.id)}
                                                className="w-1/3 h-full rounded-r bg-primary-200 hover:bg-primary-300 transition text-primary-900 font-bold text-xl"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleAdd(p)}
                                            className={`w-full h-10 rounded-lg py-2 font-semibold text-white transition-all duration-300
                                            ${added[p.id]
                                                ? 'bg-green-500 animate-scalePulse'
                                                : 'bg-primary-500 hover:bg-primary-600'
                                            }`}
                                            style={{ minHeight: '2.5rem' }}
                                        >
                                            {added[p.id] ? 'Added!' : 'Add to Cart'}
                                        </button>
                                    )
                                ) : (
                                    <button
                                        disabled
                                        className="w-full h-10 rounded-lg py-2 font-semibold text-white bg-gray-300 cursor-not-allowed"
                                    >
                                        Login to Add
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
