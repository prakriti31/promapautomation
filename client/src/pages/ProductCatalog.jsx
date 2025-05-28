import { useEffect, useState } from 'react';
import api from '../api/api';

export default function ProductCatalog(){
    const [products,setProducts]=useState([]);
    const [selected,setSelected]=useState(null);

    useEffect(()=>{ api.get('/products').then(r=>setProducts(r.data)); },[]);
    const categories=[...new Set(products.map(p=>p.category))];

    return(
        <div className="max-w-6xl mx-auto p-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto py-4">
                <button onClick={()=>setSelected(null)}
                        className={`px-4 py-2 rounded-full border ${selected===null?'bg-primary-100':''}`}>
                    All
                </button>
                {categories.map(c=>(
                    <button key={c} onClick={()=>setSelected(c)}
                            className={`px-4 py-2 rounded-full border ${selected===c?'bg-primary-100':''}`}>
                        {c}
                    </button>
                ))}
            </div>
            {/* Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p=>!selected||p.category===selected).map(p=>(
                    <div key={p.id} className="border rounded-2xl p-4 shadow-sm">
                        <img src={p.photo_url||'https://via.placeholder.com/300'} alt={p.name}
                             className="aspect-square w-full object-cover rounded-xl"/>
                        <h3 className="mt-3 font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-500">{p.description}</p>
                        <p className="font-bold mt-1">₹{p.price}</p>
                        <button className="mt-2 w-full border rounded py-1">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
