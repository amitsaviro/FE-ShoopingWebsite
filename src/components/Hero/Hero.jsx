import React from "react";
import './Hero.css';
import mainPageImg from '../../Assets/mainPageImg.png';
import handIcon from '../../Assets/handIcon.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";


const Hero = () =>{
    return(
        <div className="hero"> 
        <div className="hero-left">
            <h2>FOR REGISTERED USERS ONLY</h2>
            <div className="hero-hand-icon">
                <p>new</p>
                <img src={handIcon} alt="hand icon"/>
            </div>
            <p>ENJOY</p>
            <p>THIS SUMMER!</p>
        <div className="hero-start-btn">
            <div>Start To Buy</div>
            <FontAwesomeIcon icon={faArrowRight} />
        </div>
        </div>
        <div className="hero-right">
            <img src={mainPageImg} alt="mainPageImg" />
        </div>
        </div>
    )
}
export default Hero