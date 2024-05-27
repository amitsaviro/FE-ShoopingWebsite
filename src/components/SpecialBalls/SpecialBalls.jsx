import React, {useState, useEffect} from "react";
import './SpecialBalls.css';
import Item from "../Item/Item";
import {getAllItems} from "../services/itemApi";
import 'ldrs/ring'

const SpecialBalls = () => {
    const [specialItems, setSpecialItems] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchSpecialItems();
    }, []);

    const fetchSpecialItems = async () => {
        try {
            const response = await getAllItems();
            if (response.data && response.data.length > 0) {
                // Filter items by name
                const specialItemNames = ['Orange & Blue Ball', 'Green & Red Ball', 'Gray Volleyball', 'Beach Volleyball'];
                const specialItemsData = response.data.filter(item => specialItemNames.includes(item.itemName));

                // Preload images and set state
                preloadImages(specialItemsData);
                setSpecialItems(specialItemsData);
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching special items:', error);
            setLoading(true);
        }
    };

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
            {loading ? ( // Render loading animation if loading is true
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
