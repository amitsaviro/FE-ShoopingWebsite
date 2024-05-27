import React, {useState, useEffect,} from "react";
import './Popular.css';
import {getAllItems} from "../services/itemApi";
import Item from "../Item/Item";



const Popular = () =>{
    const [popularItems, setPopularItems] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetchPopularItems();
    }, []);

    const fetchPopularItems = async () => {
        try {
            const response = await getAllItems();
            if (response.data && response.data.length > 0) {
                // Randomly select 4 items
                const randomItems = getRandomItems(response.data, 4);
                setPopularItems(randomItems);
                preloadImages(randomItems);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching popular items:', error);
            setLoading(true);
        }
    };

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
            {loading ? ( // Render loading animation if loading is true
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
}
export default Popular