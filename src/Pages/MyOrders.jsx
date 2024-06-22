import React, { useState, useEffect, useContext } from "react";
import { getOrderListByCustomer } from '../components/services/orderListApi';
import "./CSS/MyOrders.css"; // Import external CSS file
import { ShopContext } from "../Context/ShopContext";
import { getOrderItemsByOrderListId } from "../components/services/orderItemApi";
import CartItemsFile from '../components/CartItems/CartItemsFile';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const MyOrders = () => {
    const [orderLists, setOrderLists] = useState([]);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [selectedOrderList, setSelectedOrderList] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [clickedOrderListId, setClickedOrderListId] = useState(null);
    const [transitioning, setTransitioning] = useState(false);
    const { updateCartWithOrderItems, myOrdersCartItems, isEditMode, toggleEditMode, setSelectedOrderListId } = useContext(ShopContext);
    const [orderStatus, setOrderStatus] = useState('');
    const firstName = localStorage.getItem('firstName');

    useEffect(() => {
        fetchOrderLists();
    }, []);

    const fetchOrderLists = async () => {
        try {
            const customerId = localStorage.getItem('customerId');
            const response = await getOrderListByCustomer(customerId);
            setOrderLists(response.data.reverse());
        } catch (error) {
            console.error('Error fetching order lists:', error);
        }
    };

    const handleOrderListClick = async (orderListId, orderStatus) => {
        try {
            const response = await getOrderItemsByOrderListId(orderListId);
            const orderItems = response.data.map(orderItem => ({
                itemId: orderItem.itemId,
                quantity: orderItem.quantity
            }));
            setSelectedOrderItems(orderItems);
            setSelectedOrderList(orderListId);
            updateCartWithOrderItems(orderItems);
            setOrderStatus(orderStatus);

            setShowCart(prevShowCart => {
                if (prevShowCart && clickedOrderListId === orderListId) {
                    setTransitioning(true);
                    setTimeout(() => {
                        setClickedOrderListId(null);
                        setTransitioning(false);
                    }, 500);
                    return false;
                } else {
                    setClickedOrderListId(orderListId);
                    return true;
                }
            });
        } catch (error) {
            console.error('Error fetching order items:', error);
        }
    };

    const handleEditIconClick = () => {
        if (selectedOrderList) {
            setSelectedOrderListId(selectedOrderList);
            toggleEditMode(true);
            alert("Now you can update your order!");
        } else {
            alert("Please select an order to edit.");
        }
    };

    return (
        <div className={`my-orders-container ${transitioning ? 'transitioning' : ''}`}>
            <div className={`order-list-container ${showCart || isEditMode ? 'cart-open' : ''}`}>
                {orderLists.length > 0 && (
                    <>
                        <h2>My Orders</h2>
                        <hr className="hr-title" />
                    </>
                )}
                {orderLists.length ? (
                    <div className="order-list-container">
                        <ul className="order-list">
                            {orderLists.map(orderList => (
                                <li key={orderList.orderListId} className={`order-item ${orderList.orderListId === clickedOrderListId ? 'selected' : ''}`} onClick={() => handleOrderListClick(orderList.orderListId, orderList.status)}>
                                    <div className="order-details">
                                        <h3>Order Date: {orderList.orderDate}</h3>
                                        <p>Total Price: ${orderList.totalPrice}</p>
                                        <p>Status: {orderList.status === 'TEMP' ? 'OPEN' : orderList.status}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="empty-myOrders">
                        <h2>Your order list is empty</h2>
                        <p>Start ordering now and see your orders here!</p>
                    </div>
                )}
            </div>

            <div className={`cart-container ${showCart || isEditMode ? 'open' : ''}`}>
                <h2>Cart</h2>
                <hr className="hr-title" />
                { orderStatus === 'TEMP' && (
                    <div className="edit-icon" onClick={handleEditIconClick}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                )}
                <CartItemsFile itemsToDisplay='myOrders' orderStatus={orderStatus} />
            </div>
        </div>
    );
};

export default MyOrders;
