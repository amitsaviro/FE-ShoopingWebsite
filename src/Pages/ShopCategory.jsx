import React, { useContext, useEffect, useState } from "react";
import './CSS/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from "../components/Item/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { spiral } from 'ldrs';

spiral.register();

const ShopCategory = (props) => {
    const { items } = useContext(ShopContext);
    const [shopCategoryItems, setShopCategoryItems] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (items.length > 0) {
            fetchShopCategoryItems();
        }
    }, [items, props.category]);

    const fetchShopCategoryItems = () => {
        const categoryItems = items.filter(item => item.category === props.category);
        preloadImages(categoryItems);
        setShopCategoryItems(categoryItems);
        setLoading(false);
    };

    const preloadImages = (items) => {
        const imageImports = items.map(item => import(`../Assets/${item.imgUrl}`).then(image => ({ [item.imgUrl]: image.default })));
        Promise.all(imageImports).then(images => {
            const imageObject = Object.assign({}, ...images);
            setImageMap(imageObject);
        });
    };

    return (
        <div className="shopCategory">
            {loading && (
                <div className="loading-overlay">
                    <l-spiral size="200" speed="1.2" color="red" className="loading-spinnerIM"></l-spiral>
                </div>
            )}
            <div className="content">
                <div className="index-sort">
                    <p>
                        <span> Showing 1-12 </span> Out Of 36 Products
                    </p>
                    <div className="sort-icon">
                        Sort by <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                </div>
                <div className="shopCategory-products">
                    {shopCategoryItems.map((item, i) => (
                        <Item
                            key={i}
                            id={item.itemId}
                            name={item.itemName}
                            imgUrl={imageMap[item.imgUrl]}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            category={item.category}
                            stock={item.stock}
                        />
                    ))}
                </div>
                <div className="load-more">
                    Load More...
                </div>
            </div>
        </div>
    );
};

export default ShopCategory;
