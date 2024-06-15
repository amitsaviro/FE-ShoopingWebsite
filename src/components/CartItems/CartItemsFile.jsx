import React, { useContext, useState, useEffect } from "react";
import "./CartItemsFile.css";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus, faCreditCard, faFloppyDisk, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { updateItem } from "../services/itemApi";

const CartItemsFile = ({ itemsToDisplay, orderStatus }) => {
    const { items, cartItems, myOrdersCartItems, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount, saveOrder, getTotalMyOrdersCartAmount, isEditMode, toggleEditMode } = useContext(ShopContext);
    const [imageMap, setImageMap] = useState({});
    const shippingAddress = localStorage.getItem('address');

    useEffect(() => {
        if (items.length > 0) {
            preloadImages(items);
        }
    }, [items]);

    const preloadImages = (items) => {
        const imageImports = items.map((item) =>
            import(`../../Assets/${item.imgUrl}`).then((image) => ({ [item.imgUrl]: image.default }))
        );
        Promise.all(imageImports).then((images) => {
            const imageObject = Object.assign({}, ...images);
            setImageMap(imageObject);
        });
    };

    const getTotalAmount = itemsToDisplay === 'cart' ?//get total price base on cart/myOrders
        getTotalCartAmount(items, cartItems) :
        getTotalMyOrdersCartAmount(items, myOrdersCartItems);

    const renderCartItems = () => {
        return items.map(item => {
            const quantity = itemsToDisplay === 'myOrders' ? myOrdersCartItems[item.itemId] : cartItems[item.itemId];
            if (quantity > 0) {
                return (
                    <div key={item.itemId}>
                        <div className="cartItems-format">
                            <img src={imageMap[item.imgUrl]} alt="cart product" className="cart-item-img" />
                            <p>{item.itemName}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <div className="quantity-control">
                                {(itemsToDisplay !== 'myOrders' || (itemsToDisplay === 'myOrders' && orderStatus !== 'CLOSE')) && (//remove in close order
                                    <>
                                        <FontAwesomeIcon
                                            className={`quantity-icons ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`}//disable until edit mode
                                            icon={faMinus}
                                            onClick={() => removeFromCart(item.itemId)}
                                        />
                                    </>
                                )}
                                <span className="cartItems-quantity">
                                    {quantity}
                                </span>
                                {(itemsToDisplay !== 'myOrders' || (itemsToDisplay === 'myOrders' && orderStatus !== 'CLOSE')) && (//remove in close order
                                    <>
                                        <FontAwesomeIcon
                                            className={`quantity-icons ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`}//disable until edit mode
                                            icon={faPlus}
                                            onClick={() => addToCart(item.itemId)}
                                        />
                                    </>
                                )}
                            </div>
                            <p>${(item.price * quantity).toFixed(2)}</p>
                            {(itemsToDisplay === "cart" || (itemsToDisplay === "myOrders" && orderStatus !== "CLOSE")) && (//remove in close order
                                <div className="trash-icon-wrapper">
                                    <FontAwesomeIcon
                                        className={`trash-icon ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`}//disable until edit mode
                                        icon={faTrash}
                                        onClick={() => deleteFromCart(item.itemId)}
                                    />
                                </div>
                            )}
                        </div>
                        <hr />
                    </div>
                );
            }
            return null;
        });
    };

    const isCartEmpty = () => {//chacking empty array base on cart/myOrders
        const itemsToCheck = itemsToDisplay === 'myOrders' ? myOrdersCartItems : cartItems;
        return Object.values(itemsToCheck).every((quantity) => quantity === 0);
    };

    const handleSaveOrder = async () => {
        const customerId = localStorage.getItem('customerId');
        await saveOrder(customerId, shippingAddress);
        toggleEditMode(false);
        window.alert("Order saved successfully!");
        setTimeout(() => {
            window.location.href = '/';
        }, 500); 
    };

    const handleCheckout = async () => {
        const customerId = localStorage.getItem('customerId');
        await saveOrder(customerId, shippingAddress, "CLOSE");
        const itemsArray = itemsToDisplay === 'myOrders' ? myOrdersCartItems : cartItems;
        updateStockQuantities(itemsArray);
        toggleEditMode(false);
        window.alert("Order placed successfully!");
        setTimeout(() => {
            window.location.href = '/';
        }, 500); 
    };

    const updateStockQuantities = async (cart) => {//remove the chackout items from stock
        for (const itemId in cart) {
            const quantity = cart[itemId];
            if (quantity > 0) {
                try {
                    const item = items.find((e) => e.itemId === parseInt(itemId));
                    if (item) {
                        const updatedStock = item.stock - quantity; 
                        await updateItem(itemId, { ...item, stock: updatedStock }); // Update item's stock
                    }
                } catch (error) {
                    console.error(`Error updating stock for item ${itemId}:`, error);
                    // Handle error as needed
                }
            }
        }
    };

    return (
        <div className="cartItems">
            {isCartEmpty() ? (
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <p>Browse our products and add items to your cart!</p>
                </div>
            ) : (
                <>
                    <div className="cartItem-format-main">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        {(itemsToDisplay === "cart" || (itemsToDisplay === "myOrders" && orderStatus !== "CLOSE")) && <p>Remove</p>} 
                    </div>
                    <hr />
                    {renderCartItems()}
                    {itemsToDisplay !== 'myOrders' || (itemsToDisplay === 'myOrders' && orderStatus !== 'CLOSE') ? (
                        <div className="cartItems-down">
                            <div className="cartItems-total">
                                <h1>Cart Totals</h1>
                                <div>
                                    <div className="cartItems-total-item">
                                        <p>Subtotal</p>
                                        <p>${getTotalAmount.toFixed(2)}</p>
                                    </div>
                                    <hr />
                                    <div className="cartItems-total-item">
                                        <p>Shipping Fee</p>
                                        <p>Free</p>
                                    </div>
                                    <hr />
                                    <div className="cartItems-total-item">
                                        <h3>Total</h3>
                                        <h3>${getTotalAmount.toFixed(2)}</h3>
                                    </div>
                                </div>
                                <button className={`checkout-btn ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`} onClick={handleCheckout} >CHECKOUT <FontAwesomeIcon icon={faCreditCard} /></button>
                                <button className={`save-btn ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`} onClick={handleSaveOrder} >SAVE <FontAwesomeIcon icon={faFloppyDisk} /></button>
                            </div>
                            <div className="cartItems-promoCode">
                                <p>If you have a promo code, Enter it here</p>
                                <div className="cartItems-promoBox">
                                    <input type="text" placeholder="Promo Code..." />
                                    <button className={`submit-btn ${(!isEditMode && itemsToDisplay === 'myOrders') ? 'disabled' : ''}`} >Submit</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="order-summary">
                            <h1>Order Summary</h1>
                            <div className="cartItems-total-item">
                                <p>Total Price: </p>
                                <p>${getTotalAmount.toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className="cartItems-total-item">
                                <p>Delivery to: {shippingAddress} in 6-14 days <FontAwesomeIcon icon={faTruckFast} /></p>
                            </div>
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default CartItemsFile;
