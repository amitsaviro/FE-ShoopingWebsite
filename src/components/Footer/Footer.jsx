import React from "react";
import './Footer.css';
import logo from '../../Assets/logo.png';
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInstagram, faSquareFacebook, faSquareWhatsapp} from"@fortawesome/free-brands-svg-icons";


const Footer = () =>{
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="logo"/>
                <p><b>MIKASA</b></p>   
             </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                <FontAwesomeIcon className="icon" icon={faSquareFacebook} />
                </div>
                <div className="footer-icons-container">
                <FontAwesomeIcon className="icon" icon={faInstagram} />
                </div>
                <div className="footer-icons-container">
                <FontAwesomeIcon className="icon" icon={faSquareWhatsapp} />
                </div>
                </div>
                <div className="footer-copyright">
                    <hr/>
                    <p>Copyright @ 2024 All Right Reserved By Amit Saviro.</p>
                </div>
            
        </div>
    )
}
export default Footer