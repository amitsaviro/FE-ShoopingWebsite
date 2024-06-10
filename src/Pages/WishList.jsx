import React, { useState, useEffect, useContext } from "react";
import "./CSS/WishList.css"; 
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item/Item";
import { getAllFavoriteListByCustomerId } from "../components/services/favoriteListApi";

const WishList = () => {
    const { items, wishlist, removeFromWishlist } = useContext(ShopContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [imageMap, setImageMap] = useState({});

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    useEffect(() => {
        preloadImages(wishlistItems);
    }, [wishlistItems]);

    const fetchWishlistItems = async () => {
        try {
            const customerId = localStorage.getItem('customerId');
            const response = await getAllFavoriteListByCustomerId(customerId);
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

    const preloadImages = (wishlistItems) => {
        const imageImports = wishlistItems.map(async (wishlistItem) => {
            const item = items.find(item => item.itemId === wishlistItem.itemId);
            if (item) {
                const image = await import(`../Assets/${item.imgUrl}`);
                return { [item.imgUrl]: image.default };
            } else {
                console.warn(`Item with ID ${wishlistItem.itemId} does not exist in the items list.`);
                return null;
            }
        });
        Promise.all(imageImports).then(images => {
            const imageObject = Object.assign({}, ...images.filter(image => image !== null));
            setImageMap(imageObject);
        });
    };

    const isItemInWishlist = (itemId) => {
        return wishlist.some(wishlistItemId => wishlistItemId === itemId);
    };

    return (
        <div className="wishlist-container">
            {!wishlistItems.length ? (
                <div className="empty-cart">
                    <h2>Your wish list is empty</h2>
                    <p>Explore our products and add items to your wish list!</p>
                </div>
            ) : (
                <div className="wishlist-items">
                    {wishlistItems.map((wishlistItem, i) => {
                        const item = items.find(item => item.itemId === wishlistItem.itemId);
                        if (item) {
                            const isInWishlist = isItemInWishlist(item.itemId);
                            return (
                                <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} stock={item.stock} />
                            );
                        } else {
                            console.warn(`Item with ID ${wishlistItem.itemId} does not exist in the items list.`);
                            return null;
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default WishList;
