import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import './ProductsDes.css';
import Product from "../../Pages/Product";

const ProductsDes = (props) =>{
    const { product } = props;
    return (
        <div className="productsDes">
            HOME<FontAwesomeIcon icon={faArrowRight} />SHOP<FontAwesomeIcon icon={faArrowRight} />{product.category} <FontAwesomeIcon icon={faArrowRight} />{product.itemName}
        </div>
    );
};

export default ProductsDes;
