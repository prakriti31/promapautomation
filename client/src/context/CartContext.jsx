import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export function CartProvider({ children }) {
    const [cart, setCart] = useState({});
    const addItem = product => {
        setCart(c => {
            const qty = c[product.id]?.qty || 0;
            return { ...c, [product.id]: { product, qty: qty + 1 } };
        });
    };
    const updateItem = (id, qty) => {
        setCart(c => {
            if (qty <= 0) {
                const { [id]: _, ...rest } = c;
                return rest;
            }
            return { ...c, [id]: { product: c[id].product, qty } };
        });
    };
    return (
        <CartContext.Provider value={{ cart, addItem, updateItem }}>
            {children}
        </CartContext.Provider>
    );
}
export function useCart() {
    return useContext(CartContext);
}