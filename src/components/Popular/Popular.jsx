import React, { useState, useEffect, useContext } from "react";
import './Popular.css';
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const Popular = () => {
    const { items } = useContext(ShopContext);
    const [popularItems, setPopularItems] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            const randomItems = getRandomItems(items, 4);
            setPopularItems(randomItems);
            preloadImages(randomItems);
            setLoading(false);
        }
    }, [items]);

    const getRandomItems = (items, count) => {
        const shuffledItems = items.sort(() => 0.5 - Math.random());
        return shuffledItems.slice(0, count);
    };

    const preloadImages = (items) => {
        const imageImports = items.map(item => import(`../../Assets/${item.imgUrl}`).then(image => ({ [item.imgUrl]: image.default })));
        Promise.all(imageImports).then(images => {
            const imageObject = Object.assign({}, ...images);
            setImageMap(imageObject);
        });
    };

    return (
        <div className="popular">
            <h2>POPULAR ITEMS</h2>
            <hr />
            {loading ? (
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="popular-items">
                    {popularItems.map((item, i) => (
                        <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} category={item.category} stock={item.stock} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Popular;
