import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import "./merchantAddSuccessful.css";
import MerchantBar from "../../components/MerchantBar.js";
import Yummo_Logo from "../../components/happyyummo.png";

// import CuisineSelection from "./cuisinetest.js";

function SuccessfullyAdded() {
  return (
    <div>
      <MerchantBar />
      <div className="move-too-centre ">
        <div className="logo">
          <img
            src={Yummo_Logo}
            alt="Yummo logo"
            style={{
              width: "375px",
              height: "500px",
              borderRadius: "20%",
              marginTop: "6rem",
            }}
          />
        </div>
        <div>
          <div className="success-words">
            <p>Voilà!</p>
            <p>To view your added restaurant, </p>
            <p>select the left button.</p>
            <p>To add more restaurants,</p>
            <p>select the right button.</p>
          </div>
          <div className="buttons">
            <div className="button-one">
              <button
                class="back-button"
                onClick={() => (window.location.href = "/MerchantReviews")}
              >
                View Restaurant Reviews
              </button>
            </div>
            <div className="button-two">
              <button
                class="front-button"
                onClick={() =>
                  (window.location.href = "/MerchantAddRestaurant")
                }
              >
                Add More Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessfullyAdded;

//works
