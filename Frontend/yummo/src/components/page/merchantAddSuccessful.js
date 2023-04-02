import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./merchantAddSuccessful.css";
import Yummo_Logo from "../../components/happyyummo.png";

// import CuisineSelection from "./cuisinetest.js";

function SuccessfullyAdded() {
  const navigate = useNavigate();

  return (
    <div>
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
            <p>To view your restaurant reviews, </p>
            <p>select the left button.</p>
            <p>To add more restaurants,</p>
            <p>select the right button.</p>
          </div>
          <div className="buttons">
            <div className="button-one">
              <button class="back-button" onClick={() => navigate("/merchant")}>
                Go to Dashboard
              </button>
            </div>
            <div className="button-two">
              <button
                class="front-button"
                onClick={() => navigate("/merchant/add-restaurants")}
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