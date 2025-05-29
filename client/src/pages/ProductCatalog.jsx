import { useEffect, useState } from 'react';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function ProductCatalog() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);
    const { cart, addItem, updateItem } = useCart();

    useEffect(() => {
        api.get('/products').then(r => setProducts(r.data));
    }, []);
    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Category pills */}
            ...
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {products
                    .filter(p => !selected || p.category === selected)
                    .map(p => {
                        const cartItem = cart[p.id];
                        return (
                            <div key={p.id} className="border rounded-2xl p-4 shadow-sm">
                                <img
                                    src={p.photo_url}
                                    alt={p.name}
                                    className="h-40 w-full object-cover mb-2"
                                />
                                <h3 className="font-bold text-lg">{p.name}</h3>
                                <p className="mb-2">${p.price}</p>
                                {cartItem ? (
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => updateItem(p.id, cartItem.qty - 1)}>-</button>
                                        <span>{cartItem.qty}</span>
                                        <button onClick={() => updateItem(p.id, cartItem.qty + 1)}>+</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addItem(p)}
                                        className="bg-primary-500 text-white px-3 py-1 rounded"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}