import React,{useState} from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { IndianRupee as Rupee } from 'lucide-react';

export default function CartPage(){
    const {cart,inc,dec,clear,total,countTypes}=useCart();
    const {user}=useAuth();
    const [placing,setPlacing]=useState(false);

    const items=Object.values(cart);

    const placeOrder=async()=>{
        setPlacing(true);
        await api.post('/orders',{
            user_id:user.id,
            customer_email:user.email,
            total,
            items:items.map(({product,qty})=>({
                product_id:product.id, qty, price:product.price, name:product.name
            }))
        });
        clear();
        alert('Your request has been received, you will be contacted soon.');
        setPlacing(false);
    };

    if(countTypes===0) return <p className="p-8 text-center">Cart is empty.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            {items.map(({product,qty})=>(
                <div key={product.id} className="flex gap-4 border-b pb-3">
                    <img src={product.photo_url} alt={product.name} className="h-24 w-24 object-cover rounded"/>
                    <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="flex items-center gap-1">
                            <Rupee className="w-4 h-4"/>{product.price}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <button onClick={()=>dec(product.id)} className="px-2 border rounded">-</button>
                            <span>{qty}</span>
                            <button onClick={()=>inc(product.id)} className="px-2 border rounded">+</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-right text-lg font-bold">
                Total:&nbsp;<Rupee className="inline w-4 h-4"/>{total}
            </div>
            <button
                disabled={placing}
                onClick={placeOrder}
                className="bg-primary-600 text-white px-6 py-2 rounded float-right"
            >
                {placing?'Placing…':'Place Order'}
            </button>
        </div>
    );
}
