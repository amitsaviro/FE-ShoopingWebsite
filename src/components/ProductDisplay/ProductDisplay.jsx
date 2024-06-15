import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import soldOutImage from "../../Assets/soldOut.png";
import { ShopContext } from "../../Context/ShopContext";
import AuthContext from "../../Context/AuthProvider";
import { createNewFavoriteList, deleteFavoriteList, getAllFavoriteListByCustomerId } from "../services/favoriteListApi";

const ProductDisplay = (props) => {
    const { product, imageUrl, isInWishlist } = props;
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useContext(ShopContext); 
    const { auth } = useContext(AuthContext);
    const isOutOfStock = product.stock === 0;
    const [isAnimating, setIsAnimating] = useState(false);
    const [isProductInWishlist, setIsProductInWishlist] = useState(false);
    const [showAddedToWishlist, setShowAddedToWishlist] = useState(false);

    useEffect(() => {
        // Check if the product is in the wishlist
        setIsProductInWishlist(wishlist.includes(product.itemId));
    }, [wishlist, product.itemId]);

    useEffect(() => {
        // Fetch wishlist data from the database
        const fetchWishlistData = async () => {
            try {
                const customerId = localStorage.getItem('customerId');
                const response = await getAllFavoriteListByCustomerId(customerId);
                const wishlistItems = response.data.map(item => item.itemId);
                setIsProductInWishlist(wishlistItems.includes(product.itemId));
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };
        fetchWishlistData();
    }, [product.itemId]);

    const handleAddToCart = async () => {
        if (auth.token) {
            if (!isOutOfStock) {
                setIsAnimating(true);
                addToCart(product.itemId);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 500); 
            } else {
                alert("This item is out of stock.");
            }
        } else {
            alert("Please log in to add items to your cart.");
        }
    };

    const handleToggleWishlist = async () => {
        if (auth.token) {
            try {
                const customerId = parseInt(localStorage.getItem('customerId'));
                const itemId = product.itemId;
    
                if (isProductInWishlist) {
                    const favoriteListBody = { customerId, itemId };
                    console.log("FavoriteList Body:", favoriteListBody);
                    await deleteFavoriteList(customerId, itemId);
                    
                    // If the deletion is successful, update the wishlist state
                    removeFromWishlist(itemId); 
                    setIsProductInWishlist(false); // Update state
                } else {
                    // Add the item to the wishlist
                    const favoriteListBody = { customerId, itemId };
                    await createNewFavoriteList(favoriteListBody); 
                    
                    // Update the wishlist state
                    addToWishlist(itemId);
                    setShowAddedToWishlist(true); 
                    setTimeout(() => {
                        setShowAddedToWishlist(false); 
                    }, 500);
                    setIsProductInWishlist(true); // Update state
                }
            } catch (error) {
                console.error('Error toggling wishlist:', error);
            }
        } else {
            alert("Please log in to add items to your wishlist.");
        }
    };

    return (
        <div className="product-display" id="product-display">
            <div className="product-display-left">
                <div className="product-display-img-list">
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                </div>
                <div className={`product-display-img ${!isOutOfStock && isAnimating ? "product-display-fly-animation" : ""}`}>
                    {isOutOfStock && <div className="overlay">Out of Stock</div>}
                    {imageUrl && <img className="product-display-main-img" src={imageUrl} alt={product.name} />}
                    {isOutOfStock && <img className="sold-out" src={soldOutImage} alt="Sold Out" />}
                </div>
            </div>
            <div className="product-display-right">
                <h1>
                    {product.itemName}
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={`wishlist-icon ${isProductInWishlist ? 'wishlist-icon-active' : ''}`} 
                        onClick={handleToggleWishlist}
                    />
                </h1>
                {showAddedToWishlist && (
                    <div className="added-to-wishlist">Added to wishlist</div>
                )}
                <div className="product-display-right-stars">
                    <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "#e96107" }} />
                    <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "#e96107" }} />
                    <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "#e96107" }} />
                    <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "#e96107" }} />
                    <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "#e96107" }} />
                    <p>(125)</p>
                </div>
                <div className="product-display-right-prices">
                    <div className="product-display-right-old-price">
                        ${product.oldPrice}
                    </div>
                    <div className="product-display-right-price">
                        ${product.price}
                    </div>
                </div>
                <div className="right-description"> 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit hic unde officiis officia maxime quo inventore ipsum exercitationem sit. Itaque.
                </div>
                <div className="available">{!isOutOfStock && `Available: ${product.stock}`}</div>
                <button className="product-display-addToCart" disabled={isOutOfStock} onClick={handleAddToCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default ProductDisplay;
