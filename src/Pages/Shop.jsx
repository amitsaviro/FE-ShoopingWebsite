import React from "react";
import Popular from '../components/Popular/Popular';
import Hero from '../components/Hero/Hero'
import Offers from "../components/Offers/Offers";
import SpecialBalls from "../components/SpecialBalls/SpecialBalls";
import NewsLetter from "../components/NewsLetter/NewsLetter";



const Shop = () =>{
    return(
        <div className="shop">
            <Hero/>
            <Popular/>
            <Offers/>
            <SpecialBalls/>
            <NewsLetter/>
        </div>
    )
}
export default Shop