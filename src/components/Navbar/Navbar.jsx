import React, { useState, useContext, useEffect } from "react";
import './Navbar.css';
import logo from '../../Assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import AuthContext from "../../Context/AuthProvider"; // Import AuthContext
import { ShopContext } from "../../Context/ShopContext";


const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [cartItemCount, setCartItemCount] = useState(0); // update cart logo-number
    const location = useLocation();
    const isSearchResultsPage = location.pathname.includes("/search-results");
    const isCartOrWishlistPage = location.pathname.includes("/cart") || location.pathname.includes("/wishList");
    const { auth, setAuth } = useContext(AuthContext); // Access auth and setAuth from AuthContext
    const { calculateTotalCartItems, cartItems } = useContext(ShopContext);


    const firstName = localStorage.getItem('firstName');

    useEffect(() => {
        setCartItemCount(calculateTotalCartItems());
    }, [cartItems]); 


    const handleLogout = () => {
        const logoutConfirmed = window.confirm(`Logout from ${firstName}?`);
        if (logoutConfirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            setAuth({}); // Update auth state to empty//isn't authenticate
            // Redirect to home page after logout
            window.location.href = "/";
        }
    };

    const handleCartClick = () => {
        if (!auth.token) { // Check if user is authenticated
            alert("Only logged-in customers can access the cart.");
            window.location.href = "/login"; // Redirect to login
        }
    };
    
    const handleWishlistClick = () => {
        if (!auth.token) { // Check if user is authenticated
            alert("Only logged-in customers can access the wishlist.");
            window.location.href = "/login"; // Redirect to login
        }
    };

    return (
        <div className="navbar">
            <div className="nav_logo">
                <img src={logo} alt="logo" />
                <p><b>MIKASA</b></p>
            </div>
            <ul className="nav_menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link to='/'>Shop</Link> 
                    {menu === "shop" && !isSearchResultsPage && !isCartOrWishlistPage && location.pathname !== '/register' && location.pathname !== '/login' ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("football") }}>
                    <Link to='/football'>Football</Link>
                    {menu === "football" && !isSearchResultsPage && !isCartOrWishlistPage && location.pathname !== '/register' && location.pathname !== '/login' ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("volleyball") }}>
                    <Link to='/volleyball'>Volleyball</Link>
                    {menu === "volleyball" && !isSearchResultsPage && !isCartOrWishlistPage && location.pathname !== '/register' && location.pathname !== '/login' ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("hats") }}>
                    <Link to='/hats'>Hats</Link>
                    {menu === "hats" && !isSearchResultsPage && !isCartOrWishlistPage && location.pathname !== '/register' && location.pathname !== '/login' ? <hr /> : <></>}
                </li>
            </ul>
            <div className="cart_wish_icons">
                <Link to='/wishList' onClick={handleWishlistClick}><FontAwesomeIcon icon={faHeart} /></Link>
                <Link to='/cart' onClick={handleCartClick}><FontAwesomeIcon icon={faCartShopping} /></Link>
                <div className="icons_count">{cartItemCount}</div>
            </div>
            <div className="login_navbar">
                {firstName ? (
                    <div className="profile-dropdown">
                        <FontAwesomeIcon className="dropdown-icon" icon={faAngleDown} />
                        <span>Welcome, {firstName}!</span>
                        <div className="dropdown-content">
                            <Link to="/edit-profile">Edit Profile</Link>
                            <Link to="/my-orders">My Orders</Link>
                        </div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <Link to='/login'><button>Login</button></Link>
                        <Link to='/register'><button>Sign-Up</button></Link>
                    </div>
                )}
            </div>
            <div className="search-bar-container">
                <SearchBar />
            </div>
        </div>
    );
}

export default Navbar;
