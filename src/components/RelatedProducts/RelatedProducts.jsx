import React, {useState, useEffect,} from "react";
import "./RelatedProducts.css"
import {getAllItems} from "../services/itemApi";
import Item from "../Item/Item";



const RelatedProducts = (props) =>{
    const {product}=props;
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRelatedProducts();
    }, [product]);

    const fetchRelatedProducts = async () => {
        try {
            const response = await getAllItems();
            if (response.data && response.data.length > 0) {
                // Randomly select 4 items
                const filteredItems = response.data.filter(item => item.itemId !== product.itemId);//filter the specif item
                const randomItems = getRandomItems(filteredItems, 4);
                setRelatedProducts(randomItems);
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
    return(
        <div className="relatedProducts">'
        <h1>Related Products</h1>
        <hr />
            {loading ? ( // Render loading animation if loading is true
                <div className="loading-animation">
                    <div className="loading-spinner"></div>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className="relatedProducts-items" onClick={fetchRelatedProducts}>
                {relatedProducts.map((item, i) => (
                        <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} category={item.category} stock={item.stock}/>
                    ))}
                </div>
            )}
            </div>
    )
}
export default RelatedProducts