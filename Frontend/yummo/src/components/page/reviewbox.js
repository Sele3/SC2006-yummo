import React from "react";
import "./reviewbox.css";
function ReviewBox(props){

    const {resID, name, address, contact_no, img, cuisine, cuisines, avg_reating, price, merchant, merchant_name, location} = props.restuarant;
    
    return(
        <div className="review-box">
            <a href="/" target="_blank">Restaurant Name</a>
        </div>
    )
}

export default ReviewBox;