import React, { useState, useEffect, createContext, useContext } from "react";
import { getAllItems } from "../components/services/itemApi";
import AuthContext from "./AuthProvider";
import { createNewOrderList, updateOrderList } from "../components/services/orderListApi";
import { createNewOrderItem, deleteAllOrderItemsByOrderListId } from "../components/services/orderItemApi";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [myOrdersCartItems, setMyOrdersCartItems] = useState({});
    const [items, setItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0); 
    const [wishlist, setWishlist] = useState([]); 
    const { auth } = useContext(AuthContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [selectedOrderListId, setSelectedOrderListId] = useState(null);
    
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
    useEffect(() => {
        localStorage.setItem('myOrdersCart', JSON.stringify(myOrdersCartItems)); // Store cart items in localStorage
    }, [myOrdersCartItems]);

    const getDefaultCart = (items) => {//first empty cart
        let cart = {};
        for (let i = 0; i < items.length; i++) {
            cart[items[i].itemId] = 0;
        }
        return cart;
    };

    const addToCart = (itemId) => {//add to cart base on edit mode
        if (!isEditMode) {
            const item = items.find((item) => item.itemId === itemId);
            if (cartItems[itemId] < item.stock) {
                setCartItems((prev) => {
                    const updatedCartItems = {
                        ...prev,
                        [itemId]: (prev[itemId] || 0) + 1
                    };
                    console.log(`Added item ${itemId} to cart. Updated cart items:`, updatedCartItems);
                    return updatedCartItems;
                });
                setCartItemCount((prevCount) => prevCount + 1);
            } else {
                alert(`Cannot add more of ${item.itemName}. Only ${item.stock} in stock.`);
            }
        } else {
            const item = items.find((item) => item.itemId === itemId);
            if (myOrdersCartItems[itemId] < item.stock) {
                setMyOrdersCartItems((prev) => {
                    const updatedMyOrdersCartItems = {
                        ...prev,
                        [itemId]: (prev[itemId] || 0) + 1
                    };
                    console.log(`Added item ${itemId} to my orders cart. Updated my orders cart items:`, updatedMyOrdersCartItems);
                    return updatedMyOrdersCartItems;
                });
            } else {
                alert(`Cannot add more of ${item.itemName}. Only ${item.stock} in stock.`);
            }
        }
    };
    

    const removeFromCart = (itemId) => {//remove from cart with chacking edit mode
        if(!isEditMode){
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            setCartItemCount((prevCount) => prevCount - 1); // Update cart item count
        }
    }
    else{
        if (myOrdersCartItems[itemId] > 0) {
            setMyOrdersCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
    }
    };

    const deleteFromCart = (itemId) => {//delete item from cart with chacking edit mode
        if(!isEditMode){
        setCartItemCount((prevCount) => prevCount - cartItems[itemId]); 
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }));//trash icon in cartItemsFile make it 0
        }
        else{
            setMyOrdersCartItems((prev) => ({ ...prev, [itemId]: 0 }));
        }
    };
    
    const deleteAllCart = () => {
        if(!isEditMode){
        setCartItems({}); // Clear cart items
        setCartItemCount(0); // Reset cart item count
        }
        else{
            setMyOrdersCartItems({});
        }
    };

    const addToWishlist = (itemId) => {
        setWishlist((prev) => [...prev, itemId]); // Add item to wishlist
    };

    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => prev.filter((id) => id !== parseInt(itemId))); // Remove item from wishlist
    };
    
    const getTotalCartAmount = (items, cartItems) => {//total price for cart page
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const item = items.find((e) => e.itemId === parseInt(itemId));
            if (item && cartItems[itemId] > 0) {
                totalAmount += item.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };
    
    const getTotalMyOrdersCartAmount = (items, myOrdersCartItems) => {// total price for my orders page
        let totalAmount = 0;
        for (const itemId in myOrdersCartItems) {
            const item = items.find((e) => e.itemId === parseInt(itemId));
            if (item && myOrdersCartItems[itemId] > 0) {
                totalAmount += item.price * myOrdersCartItems[itemId];
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
        // Determine which items and cart to use based on edit mode
        const itemsToSave = isEditMode ? myOrdersCartItems : cartItems;
        const getTotalAmountFunc = isEditMode ? getTotalMyOrdersCartAmount : getTotalCartAmount;
        const orderListIdToSave = selectedOrderListId;
    
        if (isEditMode && orderListIdToSave) {
            // Update existing order list
            const orderListBody = {
                orderId: orderListIdToSave,
                customerId,
                shippingAddress,
                totalPrice: getTotalAmountFunc(items, itemsToSave),
                status
            };
    
            try {
                await updateOrderList(orderListIdToSave, orderListBody);
    
                // Delete all order items by order list ID
                await deleteAllOrderItemsByOrderListId(orderListIdToSave);
    
                // Create order items
                for (const itemId in itemsToSave) {
                    const quantity = itemsToSave[itemId];
                    if (quantity > 0) {
                        const orderItemBody = {
                            orderId: selectedOrderListId,
                            itemId,
                            quantity
                        };
                        await createNewOrderItem(orderItemBody);
                    }
                }    
            } catch (error) {
                console.error("Error updating order:", error);
                alert("Failed to update order. Please try again later.");
                throw error;
            }
    
        } else {
            // Create new order list
            const orderListBody = {
                customerId,
                shippingAddress,
                totalPrice: getTotalAmountFunc(items, itemsToSave),
                status
            };
    
            try {
                const response = await createNewOrderList(orderListBody);
                const orderId = response.data;
    
                // Create order items
                for (const itemId in itemsToSave) {
                    const quantity = itemsToSave[itemId];
                    if (quantity > 0) {
                        const orderItemBody = {
                            orderId,
                            itemId,
                            quantity
                        };
                        await createNewOrderItem(orderItemBody);
                    }
                }
                // After all order items are saved successfully, clear cart items
                if (!isEditMode) {
                    deleteAllCart();
                }
            } catch (error) {
                console.error("Error saving order:", error);
                alert("Failed to save order. Please try again later.");
                throw error;
            }
        }
    };
    
    const updateCartWithOrderItems = (orderItems) => {
        const updatedCartItems = {}; // Create a copy of the current myOrdersCartItems
    
        let totalCount = 0;
        let totalPrice = 0;
    
        orderItems.forEach((orderItem) => {
            const { itemId, quantity } = orderItem;
            updatedCartItems[itemId] = (updatedCartItems[itemId] || 0) + quantity; // Update quantity
            
            const item = items.find((e) => e.itemId === parseInt(itemId));
            if (item) {
                totalPrice += item.price * quantity; // Accumulate total price
            }
        });
    
        items.forEach((item) => {
            if (!updatedCartItems[item.itemId]) {
                updatedCartItems[item.itemId] = 0;
            }
        });
    
        setMyOrdersCartItems(updatedCartItems); // Update myOrdersCartItems with updated quantities
    
    };
    

    const toggleEditMode = (value) => {
        setIsEditMode(value);
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
        updateCartWithOrderItems,
        myOrdersCartItems,
        getTotalMyOrdersCartAmount, 
        toggleEditMode, 
        isEditMode, 
        setSelectedOrderListId
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
