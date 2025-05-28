import { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminDashboard(){
    const blank={category:'',name:'',description:'',price:'',photo_url:''};
    const [form,setForm]=useState(blank);
    const [products,setProducts]=useState([]);

    const load=()=>api.get('/products').then(r=>setProducts(r.data));
    useEffect(load,[]);

    const save= async e=>{
        e.preventDefault();
        await api.post('/products',form);
        setForm(blank); load();
    };
    const del= async id=>{
        if(window.confirm('Delete?')){
            await api.delete(`/products/${id}`); load();
        }
    };

    const handle=e=>setForm({...form,[e.target.name]:e.target.value});

    return(
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl mb-4">Admin Panel</h1>

            <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {['category','name','description','price','photo_url'].map(f=>(
                    <input key={f} name={f} placeholder={f}
                           className="border p-2 rounded"
                           value={form[f]} onChange={handle}/>
                ))}
                <button className="col-span-full bg-primary-500 text-white p-2 rounded">Add / Update</button>
            </form>

            <table className="w-full border">
                <thead className="bg-primary-100">
                <tr><th>ID</th><th>Name</th><th>Price</th><th>Cat</th><th></th></tr>
                </thead>
                <tbody>
                {products.map(p=>(
                    <tr key={p.id} className="text-center border-t">
                        <td>{p.id}</td><td>{p.name}</td><td>{p.price}</td><td>{p.category}</td>
                        <td><button onClick={()=>del(p.id)} className="text-red-600">🗑</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
