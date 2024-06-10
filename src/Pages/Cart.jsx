import React, { useContext } from 'react';
import AuthContext from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import CartItemsFile from '../components/CartItems/CartItemsFile';

const Cart = () => {
    const { auth } = useContext(AuthContext);

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
          <CartItemsFile/>
        </div>
    );
};

export default Cart;
