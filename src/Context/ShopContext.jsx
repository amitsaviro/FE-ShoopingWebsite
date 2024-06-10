import React, { useState, useEffect, createContext, useContext } from "react";
import { getAllItems } from "../components/services/itemApi";
import AuthContext from "./AuthProvider";
import { createNewOrderList } from "../components/services/orderListApi";
import { createNewOrderItem } from "../components/services/orderItemApi";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [items, setItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0); 
    const [wishlist, setWishlist] = useState([]); 
    const { auth } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getAllItems();
                const fetchedItems = response.data;
                setItems(fetchedItems);
                setCartItems(getDefaultCart(fetchedItems));
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // Watch for changes in cartItems state
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Store cart items in localStorage
    }, [cartItems]);

    const getDefaultCart = (items) => {
        let cart = {};
        for (let i = 0; i < items.length; i++) {
            cart[items[i].itemId] = 0;
        }
        return cart;
    };

    const addToCart = (itemId) => {
        console.log(cartItems);
        const item = items.find((item) => item.itemId === itemId);
        if (cartItems[itemId] < item.stock) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            setCartItemCount((prevCount) => prevCount + 1); 
        } else {
            alert(`Cannot add more of ${item.itemName}. Only ${item.stock} in stock.`);
        }
    };

    const removeFromCart = (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            setCartItemCount((prevCount) => prevCount - 1); // Update cart item count
        }
    };

    const deleteFromCart = (itemId) => {
        setCartItemCount((prevCount) => prevCount - cartItems[itemId]); // Update cart item count
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    };
    
    const deleteAllCart = () => {
        setCartItems({}); // Clear cart items
        setCartItemCount(0); // Reset cart item count
    };

    const addToWishlist = (itemId) => {
        setWishlist((prev) => [...prev, itemId]); // Add item to wishlist
    };

    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => prev.filter((id) => id !== parseInt(itemId))); // Remove item from wishlist
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            const item = items.find((e) => e.itemId === parseInt(itemId)); // Convert itemId to the itemId backend type
    
            if (item && cartItems[itemId] > 0) {
                totalAmount += item.price * cartItems[itemId];
            }
        }
    
        return totalAmount;
    };

    const calculateTotalCartItems = () => {
        let totalCount = 0;
        for (const key in cartItems) {
            totalCount += cartItems[key];
        }
        return totalCount;
    };

    const saveOrder = async (customerId, shippingAddress, status = "TEMP") => {
        // Create the order list
        const orderListBody = {
            customerId,
            shippingAddress,
            totalPrice: getTotalCartAmount(), 
            status: status 
        };

        try {
            const response = await createNewOrderList(orderListBody);
            const orderId = response.data;

            // Create order items
            for (const itemId in cartItems) {
                const quantity = cartItems[itemId];
                if (quantity > 0) {
                    const orderItemBody = {
                        orderId,
                        itemId,
                        quantity
                    };
                    await createNewOrderItem(orderItemBody);
                }
            }

            // Clear cart items after successful order creation
            deleteAllCart();
            alert("Order saved successfully!");
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Failed to save order. Please try again later.");
        }
    };
    
    const updateCartWithOrderItems = (orderItems) => {
        const updatedCartItems = {}; // Create a copy of the current cartItems
    
        let totalCount = 0;
        let totalPrice = 0;
    
        orderItems.forEach((orderItem) => {
            const { itemId, quantity } = orderItem;
            updatedCartItems[itemId] = (updatedCartItems[itemId] || 0) + quantity; // Increment the quantity of existing items or add new items
            totalCount += quantity;
            const item = items.find((e) => e.itemId === parseInt(itemId));
            if (item) {
                totalPrice += item.price * quantity;
            }
        });
    
        // Ensure items not present in the orderItems are initialized with quantity 0
        items.forEach((item) => {
            if (!updatedCartItems[item.itemId]) {
                updatedCartItems[item.itemId] = 0;
            }
        });
    
        setCartItems(updatedCartItems); // Update cart items state
        setCartItemCount(totalCount);
        // Update total price if needed
        // Update any other properties as necessary
    };
    
    
    const contextValue = {
        items,
        addToCart,
        removeFromCart,
        deleteFromCart,
        addToWishlist,
        deleteAllCart,
        removeFromWishlist,
        wishlist,
        getTotalCartAmount,
        cartItems,
        calculateTotalCartItems,
        saveOrder,
        updateCartWithOrderItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
