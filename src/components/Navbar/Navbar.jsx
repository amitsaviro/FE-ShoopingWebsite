import React, { useState, useContext, useEffect } from "react";
import './Navbar.css';
import logo from '../../Assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faAngleDown, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import AuthContext from "../../Context/AuthProvider";
import { ShopContext } from "../../Context/ShopContext";
import { deleteCustomer } from "../services/customerApi";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [cartItemCount, setCartItemCount] = useState(0);
    const location = useLocation();
    const isSearchResultsPage = location.pathname.includes("/search-results");
    const isCartOrWishlistPage = location.pathname.includes("/cart") || location.pathname.includes("/wishList");
    const { auth, setAuth } = useContext(AuthContext);
    const { calculateTotalCartItems, cartItems } = useContext(ShopContext);
    const firstName = localStorage.getItem('firstName');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        setCartItemCount(calculateTotalCartItems());
    }, [cartItems]);

    useEffect(() => {
        const updateFirstName = () => {
            const updatedFirstName = localStorage.getItem('firstName');
            if (updatedFirstName) {
                // Update UI with the updated firstName
            }
        };

        window.addEventListener('firstNameUpdated', updateFirstName);

        return () => {
            window.removeEventListener('firstNameUpdated', updateFirstName);
        };
    }, []);

    const handleLogout = () => {
        const logoutConfirmed = window.confirm(`Logout from ${firstName}?`);
        if (logoutConfirmed) {
            clearLocalStorageAndLogout();
        }
    };

    const handleDeleteAccount = async () => {
        const deleteConfirmed = window.confirm(`Are you sure you want to delete your account, ${firstName}? This action cannot be undone.`);
        if (deleteConfirmed) {
            try {
                await deleteCustomer(localStorage.getItem('customerId'));
                clearLocalStorageAndLogout();
            } catch (error) {
                console.error("Error deleting customer:", error);
                // Handle error deleting account
            }
        }
    };

    const clearLocalStorageAndLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('customerId');
        localStorage.removeItem('firstName');
        localStorage.removeItem('address');
        setAuth({ token: null, customer: null });
        window.location.href = "/"; // Redirect to home page after logout or deletion
    };

    const handleCartClick = () => {
        if (!auth.token) {
            alert("Only logged-in customers can access the cart.");
            window.location.href = "/login"; // Redirect to login
        }
    };

    const handleWishlistClick = () => {
        if (!auth.token) {
            alert("Only logged-in customers can access the wishlist.");
            window.location.href = "/login"; // Redirect to login
        }
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div className="navbar">
            <div className="nav_logo">
                <img src={logo} alt="logo" />
                <p><b>MIKASA</b></p>
            </div>
            <ul className="nav_menu desktop-menu">
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
            <div className="desktop-searchbar desktop-menu">
                <SearchBar />
            </div>
            <div className="cart_wish_icons desktop-menu">
                <Link to='/wishList' onClick={handleWishlistClick}><FontAwesomeIcon icon={faHeart} /></Link>
                <Link to='/cart' onClick={handleCartClick}><FontAwesomeIcon icon={faCartShopping} /></Link>
                <div className="icons_count">{cartItemCount}</div>
            </div>
            <div className="login_navbar desktop-menu">
                {firstName ? (
                    <div className="profile-dropdown">
                        <FontAwesomeIcon className="dropdown-icon" icon={faAngleDown} />
                        <span>Welcome, {firstName}!</span>
                        <div className="dropdown-content">
                            <Link to="/edit-profile">Edit Profile</Link>
                            <Link to="/my-orders">My Orders</Link>
                            <div onClick={handleDeleteAccount} className="delete-account-btn">
                                <FontAwesomeIcon icon={faTrash} className="trash-icon-navbar" /> Delete Account
                            </div>
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
            <div className={`mobile-menu ${showMobileMenu ? "active" : ""}`}>
                {firstName && (
                    <div className="mobile-menu-welcome">
                        Hello, {firstName}!
                    </div>
                )}
                <SearchBar />
                <ul className="mobile-menu-items">
                    <li onClick={() => setMenu("football")}>
                        <Link to='/football'>Football</Link>
                    </li>
                    <li onClick={() => setMenu("volleyball")}>
                        <Link to='/volleyball'>Volleyball</Link>
                    </li>
                    <li onClick={() => setMenu("hats")}>
                        <Link to='/hats'>Hats</Link>
                    </li>
                    <li className="mobile-menu-item">
                        <Link to='/wishList' onClick={handleWishlistClick}><FontAwesomeIcon icon={faHeart} /> Wish List</Link>
                    </li>
                    <li className="mobile-menu-item">
                        <Link to='/cart' onClick={handleCartClick}><FontAwesomeIcon icon={faCartShopping} /> Cart</Link>
                    </li>
                    {auth.token && (
                        <li className="mobile-menu-item" onClick={handleLogout}>
                            <button>Logout</button>
                        </li>
                    )}
                    {!auth.token && (
                        <li className="mobile-menu-item">
                            <Link to='/login'><button>Login</button></Link>
                        </li>
                    )}
                    {!auth.token && (
                        <li className="mobile-menu-item">
                            <Link to='/register'><button>Sign-Up</button></Link>
                        </li>
                    )}
                    {firstName && (
                        <li className="mobile-menu-item">
                            <div onClick={handleDeleteAccount} className="delete-account-btn">
                                <FontAwesomeIcon icon={faTrash} className="trash-icon-navbar" /> Delete Account
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <FontAwesomeIcon icon={faBars} className="menu-toggle" onClick={toggleMobileMenu} />
        </div>
    );
}

export default Navbar;
