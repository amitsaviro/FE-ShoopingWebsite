import React, { useState, useEffect, useContext } from "react";
import './SpecialBalls.css';
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
import 'ldrs/ring';

const SpecialBalls = () => {
    const { items } = useContext(ShopContext);
    const [specialItems, setSpecialItems] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            // Filter items by name
            const specialItemNames = ['Orange & Blue Ball', 'Green & Red Ball', 'Gray Volleyball', 'Beach Volleyball'];
            const specialItemsData = items.filter(item => specialItemNames.includes(item.itemName));
            // Preload images and set state
            preloadImages(specialItemsData);
            setSpecialItems(specialItemsData);
            setLoading(false);
        }
    }, [items]);

    const preloadImages = (items) => {
        const imageImports = items.map(item => import(`../../Assets/${item.imgUrl}`).then(image => ({ [item.imgUrl]: image.default })));
        Promise.all(imageImports).then(images => {
            const imageObject = Object.assign({}, ...images);
            setImageMap(imageObject);
        });
    };

    return (
        <div className="special">
            <h2>SPECIAL BALLS</h2>
            <hr/>
            {loading ? (
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="images">
                    {specialItems.map((item, i) => (
                        <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} category={item.category} stock={item.stock}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpecialBalls;
