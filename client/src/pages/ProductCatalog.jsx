// ProductCatalog.jsx
import React, { useState, useEffect, memo } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';
import LoginPrompt from '../components/LoginPrompt';

function ProductCard({ p, inCart, added, handleAdd, inc, dec, isLoggedIn }) {
    const priceNum = Number(p.price) || 0;

    return (
        <div className="fade-in-up bg-white rounded-xl shadow-lg p-4 transition hover:shadow-2xl">
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

            {isLoggedIn ? (
                inCart ? (
                    <div className="flex items-center justify-between w-full h-10">
                        <button onClick={() => dec(p.id)} className="w-1/3 h-full rounded-l bg-primary-200 hover:bg-primary-300 transition text-primary-900 font-bold text-xl">–</button>
                        <div className="w-1/3 h-full flex items-center justify-center bg-primary-100 text-primary-900 font-semibold text-lg">{inCart.qty}</div>
                        <button onClick={() => inc(p.id)} className="w-1/3 h-full rounded-r bg-primary-200 hover:bg-primary-300 transition text-primary-900 font-bold text-xl">+</button>
                    </div>
                ) : (
                    <button
                        onClick={() => handleAdd(p)}
                        className={`w-full h-10 rounded-lg py-2 font-semibold text-white transition-all
                        ${added[p.id] ? 'bg-green-500 animate-scalePulse' : 'bg-primary-500 hover:bg-primary-600'}`}
                    >
                        {added[p.id] ? 'Added!' : 'Add to Cart'}
                    </button>
                )
            ) : (
                <button className="w-full h-10 rounded-lg py-2 font-semibold text-white bg-gray-300 cursor-not-allowed" disabled>
                    Login to Add
                </button>
            )}
        </div>
    );
}

const MemoProductCard = memo(ProductCard);

export default function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [added, setAdded] = useState({});
    const { cart, add, inc, dec } = useCart();
    const isLoggedIn = !!localStorage.getItem('user');

    useEffect(() => {
        api.get('/products').then(r => setProducts(r.data));
    }, []);

    const handleAdd = (p) => {
        add(p);
        setAdded(id => ({ ...id, [p.id]: true }));
        toast.success(`${p.name} added to cart!`);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => setAdded(id => ({ ...id, [p.id]: false })), 800);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 relative">
            {!isLoggedIn && <LoginPrompt />}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <MemoProductCard
                        key={p.id}
                        p={p}
                        inCart={cart[p.id]}
                        added={added}
                        handleAdd={handleAdd}
                        inc={inc}
                        dec={dec}
                        isLoggedIn={isLoggedIn}
                    />
                ))}
            </div>
        </div>
    );
}
