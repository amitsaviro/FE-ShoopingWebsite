import React from "react";
import "./ProductDisplay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import soldOutImage from "../../Assets/soldOut.png"

const ProductDisplay = (props) => {
    const { product, imageUrl} = props;
    const isOutOfStock = product.stock === 0;

    return (
        <div className="product-display">
            <div className="product-display-left">
                <div className="product-display-img-list">
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                    {imageUrl && <img src={imageUrl} alt={product.name} />}
                </div>
                <div className="product-display-img">
                    {isOutOfStock && <div className="overlay">Out of Stock</div>}
                    {imageUrl && <img className="product-display-main-img" src={imageUrl} alt={product.name} />}
                    {isOutOfStock && <img className="sold-out" src={soldOutImage} alt="Sold Out" />}
                </div>
            </div>
            <div className="product-display-right">
                <h1>{product.itemName}</h1>
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
                <div className="right-description"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit hic unde officiis officia maxime quo inventore ipsum exercitationem sit. Itaque.
                </div>
                <div className="available">{!isOutOfStock && `Available: ${product.stock}`}</div>
                <button className="product-display-addToCart" disabled={isOutOfStock}>
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default ProductDisplay;
