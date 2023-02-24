import React, { useState, createContext, useEffect } from "react";

const DataContext = createContext();

const ComponentContext = ({children}) => {
    const [section, setSection] = useState('all');
    const [cart, setCart] = useState([]);
    const [localCart, setLocalCart] = useState(false);

    useEffect(() => {
        const local = localStorage.getItem('cart');
        if (local) {
            const localData = JSON.parse(local);
            setCart(localData);
        }
        setLocalCart(true);
    }, []);

    useEffect(() => {
        if (localCart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, localCart]);

    return (
        <DataContext.Provider value={{section, setSection, cart, setCart}}>
            { children }
        </DataContext.Provider>
    )
}

export default ComponentContext;
export {
    DataContext
};