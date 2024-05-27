import React from "react";
import'./Offers.css'
import offerImg from '../../Assets/offerImg.png';


const Offers = () =>{
    return(
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1 className="ofy">Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={offerImg} alt="exclusive"/>
            </div>
        </div>
    )
}
export default Offers