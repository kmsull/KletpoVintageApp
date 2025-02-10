// app/contexts/BetContext/BetContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from 'react';

interface Item {
    id: string;
    name: string;
    description: string;
    size: string;
    price: number;
}

interface Cart {
    items: Item[];
    total: number;
}

interface CartContextValue {
    cart: Cart;
    addItem: (item: Item) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextValue>({
    cart: { items: [], total: 0 },
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
});

interface CartContextValueProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextValueProviderProps) => {

    const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

    /*
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    */

    const addItem = (item: Item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    ...prevCart,
                    items: prevCart.items.map((i) =>
                        i.id === item.id ? { ...i, price: i.price + item.price } : i
                    ),
                    total: prevCart.total + item.price,
                };
            } else {
                return {
                    ...prevCart,
                    items: [...prevCart.items, item],
                    total: prevCart.total + item.price,
                };
            }
        });
    };

    const removeItem = (itemId: string) => {
        setCart((prevCart) => {
            const itemToRemove = prevCart.items.find((i) => i.id === itemId);
            if (!itemToRemove) return prevCart;

            return {
                ...prevCart,
                items: prevCart.items.filter((i) => i.id !== itemId),
                total: prevCart.total - itemToRemove.price,
            };
        });
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    const value = {
        cart,
        addItem,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};