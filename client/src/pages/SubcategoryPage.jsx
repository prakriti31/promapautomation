import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';

export default function SubcategoryPage(){
    const {category,subcat} = useParams();
    const [items,setItems]=useState([]);
    const {cart,add,inc,dec}=useCart();

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


    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-semibold py-4">{category} &gt; {subcat}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map(p=>{
                    const inCart=cart[p.id];
                    return (
                        <div key={p.id} className="border rounded-xl shadow-sm p-3">
                            <img src={p.photo_url} alt={p.name} className="h-40 w-full object-cover rounded"/>
                            <h3 className="mt-2 font-bold">{p.name}</h3>
                            <p className="flex items-center gap-1 text-primary-800">
                                <Rupee className="w-4 h-4"/>{p.price}
                            </p>
                            {inCart?(
                                <div className="mt-2 flex items-center gap-2">
                                    <button onClick={()=>dec(p.id)} className="px-2 border rounded">-</button>
                                    <span>{inCart.qty}</span>
                                    <button onClick={()=>inc(p.id)} className="px-2 border rounded">+</button>
                                </div>
                            ):(
                                <button onClick={()=>add(p)}
                                        className="mt-2 bg-primary-500 text-white px-3 py-1 rounded w-full">
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
