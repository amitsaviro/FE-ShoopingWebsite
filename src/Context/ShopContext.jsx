import React, { useState, useEffect, createContext } from "react";
import { getAllItems } from "../components/services/itemApi";

export const ShopContext = createContext(null);

// Define getDefaultCart outside the component
const getDefaultCart = (items) => {
    let cart = {};
    for (let i = 0; i < items.length; i++) {
        cart[items[i].itemId] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getAllItems();
                const fetchedItems = response.data;
                setItems(fetchedItems);
                setCartItems(getDefaultCart(fetchedItems)); // Initialize cart with items
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const contextValue = {
        items,
        cartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
