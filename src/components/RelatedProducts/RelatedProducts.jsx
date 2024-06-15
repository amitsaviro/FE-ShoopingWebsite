import React, { useContext, useState, useEffect } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const RelatedProducts = ({ product }) => {
    const { items } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (items.length > 0) {
            fetchRelatedProducts();
        }
    }, [product, items]);

    const fetchRelatedProducts = () => {
        const filteredItems = items.filter(item => item.itemId !== product.itemId);
        const randomItems = getRandomItems(filteredItems, 4);
        setRelatedProducts(randomItems);
        preloadImages(randomItems);
        setLoading(false);
    };

    const getRandomItems = (items, count) => {
        const shuffledItems = items.sort(() => 0.5 - Math.random());//rand related items
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
        <div className="relatedProducts">
            <h1>Related Products</h1>
            <hr />
            {loading ? (
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="relatedProducts-items">
                    {relatedProducts.map((item, i) => (
                        <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} category={item.category} stock={item.stock} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;
