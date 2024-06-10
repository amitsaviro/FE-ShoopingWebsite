import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../components/services/itemApi";
import ProductsDes from "../components/ProductsDes/ProductsDes";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import { spiral } from 'ldrs';

spiral.register();

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);
    const wishlistItemIds = [];

    useEffect(() => {
        setLoading(true);
        fetchProduct(productId);
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const response = await getItem(productId);
            setProduct(response.data);
            await preloadImage(response.data.imgUrl);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };

    const preloadImage = async (imageUrl) => {
        try {
            const image = await import(`../Assets/${imageUrl}`);
            setImageMap({ [imageUrl]: image.default });
        } catch (error) {
            console.error('Error preloading image:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <l-spiral size="200" speed="1.2" color="red" className="loading-spinnerIM"></l-spiral>
            </div>
        );
    }

    return (
        <div className="product">
            <ProductsDes product={product} />
            <ProductDisplay product={product} imageUrl={imageMap[product.imgUrl]} />
            <DescriptionBox />
            <RelatedProducts product={product} />
        </div>
    );
};

export default Product;
