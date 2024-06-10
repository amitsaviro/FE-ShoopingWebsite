import React, { useState, useEffect, useContext } from "react";
import { getOrderListByCustomer } from '../components/services/orderListApi';
import "./CSS/MyOrders.css";
import { ShopContext } from "../Context/ShopContext";
import { getOrderItemsByOrderListId } from "../components/services/orderItemApi";

const MyOrders = () => {
    const [orderLists, setOrderLists] = useState([]);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [selectedOrderList, setSelectedOrderList] = useState(null);
    const [showCart, setShowCart] = useState(false); 
    const { updateCartWithOrderItems, deleteAllCart, cartItems, orderListId, setOrderListId } = useContext(ShopContext); // Use orderListId from context

    useEffect(() => {
        fetchOrderLists();
    }, []);

    useEffect(() => {
        // Watch for changes in cartItems state
        if (showCart && Object.keys(cartItems).length === 0) {
            setShowCart(false); // Hide cart if all items are removed
        }
    }, [cartItems, showCart]);

    const fetchOrderLists = async () => {
        try {
            const customerId = localStorage.getItem('customerId');
            const response = await getOrderListByCustomer(customerId);
            setOrderLists(response.data.reverse());
        } catch (error) {
            console.error('Error fetching order lists:', error);
        }
    };

    const handleOrderListClick = async (orderListId) => {
        try {
            const response = await getOrderItemsByOrderListId(orderListId);
            const orderItems = response.data.map(orderItem => ({
                itemId: orderItem.itemId,
                quantity: orderItem.quantity
            }));
            setSelectedOrderItems(orderItems);
            setSelectedOrderList(orderListId);
            setShowCart(true); 
            updateCartWithOrderItems(orderItems);
            setOrderListId(orderListId); // Update orderListId in context
            alert("Order added to cart successfully! Now you can update it!");
        } catch (error) {
            console.error('Error fetching order items:', error);
        }
    };

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            <div className="order-list-container">
                <ul className="order-list">
                    {orderLists.map(orderList => (
                        <li key={orderList.orderListId} className="order-item" onClick={() => handleOrderListClick(orderList.orderListId)}>
                            <div className="order-details">
                                <h3>Order Date: {orderList.orderDate}</h3>
                                <p>Total Price: ${orderList.totalPrice}</p>
                                <p>Status: {orderList.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyOrders;
