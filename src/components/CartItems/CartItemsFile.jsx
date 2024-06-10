import React, { useContext, useState, useEffect } from "react";
import "./CartItemsFile.css";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus, faCreditCard, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const CartItemsFile = () => {
  const { items, cartItems, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount, saveOrder } = useContext(ShopContext);
  const [imageMap, setImageMap] = useState({});

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

  const isCartEmpty = () => {
    return Object.values(cartItems).every((quantity) => quantity === 0);
  };

  const handleSaveOrder = () => {
    const customerId = localStorage.getItem('customerId'); 
    const shippingAddress = localStorage.getItem('address'); 
    saveOrder(customerId, shippingAddress);
    window.alert("Order saved successfully!");
    window.location.href = '/';   
  };

  const handleCheckout = () => {
    const customerId = localStorage.getItem('customerId'); 
    const shippingAddress = localStorage.getItem('address'); 
    saveOrder(customerId, shippingAddress, "CLOSE");
    window.alert("Order placed successfully!");
    window.location.href = '/';
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
            <p>Remove</p>
          </div>
          <hr />
          {items.map((e) => {
            if (cartItems[e.itemId] > 0) {
              return (
                <div key={e.itemId}>
                  <div className="cartItems-format">
                    <img src={imageMap[e.imgUrl]} alt="cart product" className="cart-item-img" />
                    <p>{e.itemName}</p>
                    <p>${e.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <FontAwesomeIcon className="quantity-icons" icon={faMinus} onClick={() => removeFromCart(e.itemId)} />
                      <span className="cartItems-quantity">{cartItems[e.itemId]}</span>
                      <FontAwesomeIcon className="quantity-icons" icon={faPlus} onClick={() => addToCart(e.itemId)} />
                    </div>
                    <p>${(e.price * cartItems[e.itemId]).toFixed(2)}</p>
                    <div className="trash-icon-wrapper">
                      <FontAwesomeIcon className="trash-icon" icon={faTrash} onClick={() => deleteFromCart(e.itemId)} />
                    </div>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
          <div className="cartItems-down">
            <div className="cartItems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartItems-total-item">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount().toFixed(2)}</p>
                </div>
                <hr />
                <div className="cartItems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartItems-total-item">
                  <h3>Total</h3>
                  <h3>${getTotalCartAmount().toFixed(2)}</h3>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT <FontAwesomeIcon icon={faCreditCard} /></button>
              <button className="save-btn" onClick={handleSaveOrder}>SAVE <FontAwesomeIcon icon={faFloppyDisk} /></button>
            </div>
            <div className="cartItems-promoCode">
              <p>If you have a promo code, Enter it here</p>
              <div className="cartItems-promoBox">
                <input type="text" placeholder="Promo Code..." />
                <button className="submit-btn">Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItemsFile;
