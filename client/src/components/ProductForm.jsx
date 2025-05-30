import React,{useState} from 'react';
import api from '../api/api';

const options = {
    'PLC'        : ['Siemens PLC','ABB PLC','Schneider PLC','Allen Bradley PLC'],
    'Drives'     : ['Siemens','ABB'],
    'Motors'     : ['Nord','Siemens'],
    'Power Items': ['MCCB','MCB'],
    'Cables'     : [],
};
const categories = Object.keys(options);

export default function ProductForm({onSuccess,product=null}){
    const isEdit = !!product;
    const [form,setForm]=useState({
        name:product?.name||'',
        category:product?.category||'',
        subcategory:product?.subcategory||'',
        description:product?.description||'',
        price:product?.price||'',
        photos:[null,null,null]
    });
    const change=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
    const changePhoto=(i,file)=>{const p=[...form.photos];p[i]=file;setForm(f=>({...f,photos:p}));};
    const submit=async e=>{e.preventDefault();
        try{
            if(isEdit){
                await api.put(`/products/${product.id}`,{
                    name:form.name,category:form.category,subcategory:form.subcategory,description:form.description,price:form.price});
            }else{
                const data=new FormData();
                ['name','category','subcategory','description','price'].forEach(k=>data.append(k,form[k]));
                form.photos.forEach((file,i)=>file&&data.append(`photo${i+1}`,file));
                await api.post('/products',data);
            }
            onSuccess();
            if(!isEdit) setForm({name:'',category:'',subcategory:'',description:'',price:'',photos:[null,null,null]});
        }catch(err){alert(err.response?.data?.error||'Error');}
    };
    return(
        <form onSubmit={submit} className="border p-4 rounded space-y-4">
            <h2 className="text-xl font-bold">{isEdit?'Edit Product':'Add Product'}</h2>
            <input name="name" value={form.name} onChange={change} placeholder="Name" required className="w-full border rounded p-2"/>
            <select name="category" value={form.category} onChange={e=>{change(e);setForm(f=>({...f,subcategory:''}));}} required className="w-full border rounded p-2">
                <option value="" disabled>Select category</option>
                {categories.map(c=><option key={c}>{c}</option>)}
            </select>
            <select name="subcategory" value={form.subcategory} onChange={change} required className="w-full border rounded p-2">
                <option value="" disabled>Select subcategory</option>
                {(options[form.category]||[]).map(s=><option key={s}>{s}</option>)}
            </select>
            <textarea name="description" value={form.description} onChange={change} placeholder="Description" required className="w-full border rounded p-2"/>
            <input name="price" type="number" step="0.01" value={form.price} onChange={change} placeholder="Price" required className="w-full border rounded p-2"/>
            {!isEdit && [0,1,2].map(i=>(<input key={i} type="file" accept="image/*" onChange={e=>changePhoto(i,e.target.files[0])} className="w-full"/>))}
            <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">{isEdit?'Update':'Save'}</button>
        </form>
    );
}