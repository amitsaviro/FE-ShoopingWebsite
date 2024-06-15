import React from "react";
import './item.css';
import { Link } from "react-router-dom";
import soldOutImage from "../../Assets/soldOut.png"

const Item = (props) => {// item format using in some places in website
    const isOutOfStock = props.stock === 0;

    return (
        <div className="item-container">
            <div className={`item ${isOutOfStock ? 'out-of-stock' : ''}`}>
                {isOutOfStock && <div className="overlay"></div>}
                <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <img className="item-img" src={props.imgUrl} alt="" />
                </Link>
                {isOutOfStock && <img className="sold-out-item" src={soldOutImage} alt="Sold Out" />}
                <p>{props.name}</p>
                <div className="prices">
                    <div className="item-price">
                        ${props.price}
                    </div>
                    <div className="old-price">
                        ${props.oldPrice}
                    </div>
                </div>
                <div className="available-item">
                    <p className={isOutOfStock ? 'out-of-stock-text' : ''}>
                        {isOutOfStock ? 'Out of Stock' : `Available: ${props.stock}`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Item;
