import React,{createContext,useContext,useState,useMemo} from 'react';
const CartContext = createContext();

export function CartProvider({children}) {
    const [cart,setCart] = useState({}); // {productId:{product,qty}}

    const add   = p   => setCart(c=>({...c,[p.id]:{product:p,qty:1}}));
    const inc   = id  => setCart(c=>({...c,[id]:{...c[id],qty:c[id].qty+1}}));
    const dec   = id  => setCart(c=>{
        const q=c[id].qty-1;
        if(q<=0){const {[id]:_,...rest}=c;return rest;}
        return {...c,[id]:{...c[id],qty:q}};
    });
    const clear = ()  => setCart({});

    const countTypes = Object.keys(cart).length;
    const total = useMemo(
        ()=>Object.values(cart).reduce((s,{qty,product})=>s+qty*product.price,0),
        [cart]
    );

    return (
        <CartContext.Provider value={{cart,add,inc,dec,clear,countTypes,total}}>
            {children}
        </CartContext.Provider>
    );
}
export const useCart = ()=>useContext(CartContext);
