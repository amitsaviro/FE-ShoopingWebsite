import React, { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import CartItemsFile from '../components/CartItems/CartItemsFile';
import { ShopContext } from "../Context/ShopContext";


const Cart = () => {
    const { auth } = useContext(AuthContext);
    const { cartItems } = useContext(ShopContext);

    if (!auth.token) {
        return (
            <div>
                <h1>You need to be logged in to view your cart.</h1>
                <Link to="/login">Go to Login</Link>
            </div>
        );
    }

    return (
        <div>
            <CartItemsFile itemsToDisplay='cart'/>
        </div>
    );
};

export default Cart;
