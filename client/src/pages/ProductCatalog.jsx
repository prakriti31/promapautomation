import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProductCatalog({ initialCategory = null }) {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(initialCategory);

    useEffect(() => {
        api.get('/products')
            .then(r => {
                const data = r.data;
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch(() => setProducts([]));
    }, []);

    const items = Array.isArray(products) ? products : [];
    const categories = [...new Set(items.map(p => p.category))];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto py-4">
                <button
                    onClick={() => setSelected(null)}
                    className={`px-4 py-2 rounded-full border ${selected === null ? 'bg-primary-100' : ''}`}
                >
                    All
                </button>
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setSelected(c)}
                        className={`px-4 py-2 rounded-full border ${selected === c ? 'bg-primary-100' : ''}`}
                    >
                        {c}
                    </button>
                ))}
            </div>
            {/* Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items
                    .filter(p => (!selected || p.category === selected))
                    .map(p => (
                        <div key={p.id} className="border rounded-2xl p-4 shadow-sm">
                            {/* Render product details */}
                            <h3 className="font-semibold mb-2">{p.name}</h3>
                            <p className="text-sm mb-2">{p.description}</p>
                            <p className="font-bold">${p.price}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}