import React from "react";
import "./DescriptionBox.css"

const DescriptionBox = () =>{
    return(
        <div className="description-box">
            <div className="description-box-navigator">
                <div className="description-box-nav-box">Description</div>
                <div className="description-box-nav-box fade">Reviews (130)</div>
            </div>
            <div className="description-box-pra">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quae. Ab facere illum blanditiis provident. Ullam voluptatum tempora labore velit minus commodi! Error sapiente non molestiae, consequuntur voluptatum doloremque quas.
            </div>

        </div>
    )
}
export default DescriptionBox