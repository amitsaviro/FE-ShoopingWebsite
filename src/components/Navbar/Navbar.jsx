import React, { useState } from "react";
import './Navbar.css';
import logo from '../../Assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const location = useLocation();
    const isSearchResultsPage = location.pathname.includes("/search-results");
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        const logoutConfirmed = window.confirm(`Logout from ${username}?`);
        if (logoutConfirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            // additional code for logout actions
            // Redirect to home page after logout
            window.location.href = "/";
        }
    };

    const handleCartClick = () => {
        if (!username) {
            alert("Only logged-in customers can access the cart.");
            window.location.href = "/";
        }
    };

    const handleWishlistClick = () => {
        if (!username) {
            alert("Only logged-in customers can access the wishlist.");
            window.location.href = "/";
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
                    <Link to='/'>Shop</Link> {menu === "shop" && location.pathname !== '/register' && location.pathname !== '/login' && !isSearchResultsPage ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("football") }}>
                    <Link to='/football'>Football</Link>{menu === "football" && location.pathname !== '/register' && location.pathname !== '/login' && !isSearchResultsPage ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("volleyball") }}>
                    <Link to='/volleyball'>Volleyball</Link>{menu === "volleyball" && location.pathname !== '/register' && location.pathname !== '/login' && !isSearchResultsPage ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("hats") }}>
                    <Link to='/hats'>Hats</Link>{menu === "hats" && location.pathname !== '/register' && location.pathname !== '/login' && !isSearchResultsPage ? <hr /> : <></>}
                </li>
            </ul>
            <div className="cart_wish_icons">
                <Link to='/wishList' onClick={handleWishlistClick}><FontAwesomeIcon icon={faHeart} /></Link>
                <Link to='/cart' onClick={handleCartClick}><FontAwesomeIcon icon={faCartShopping} /></Link>
                <div className="icons_count">0</div>
            </div>
            <div className="login_navbar">
                {username ? (
                    <div>Welcome, {username}! <button onClick={handleLogout}>Logout</button></div>
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
    )
}
export default Navbar;
