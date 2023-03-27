import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantAddRestaurant.css";
import MerchantGoogle from "./merchantGoogle.js";
import Mnavbar from "../../components/Mnavbar.js";
import MerchantBar from "../../components/MerchantBar.js";
// import * as React from "react";

function MerchantAddRestaurant() {
  // must change url!!
  const [markers, setMarkers] = useState([]);
  const [restName, setrestName] = useState({});
  const [resAddress, setresAddress] = useState({});
  const [contactNo, setcontactNo] = useState({});
  const [cuisine, setcuisine] = useState({});
  const [price, setprice] = useState({});
  const [priceRange, setPriceRange] = useState("1");
  const state = {
    restName: "",
    resAddress: "",
    contactNo: "",
    cuisine: "",
    price: "",
  };

  // must change url!!
  const url = "http://127.0.0.1:8000/auth/users/";
  const data = { address: state };
  const [result, setResult] = useState({});
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  async function submit(e) {
    e.preventDefault();
    let restaurant = {
      name: restName,
      address: resAddress,
      contact_no: contactNo,
      cuisines: cuisine,
      price: price,
    };

    //useEffect(() => {
    console.log(1);
    axios.post(url, restaurant);
    console.log("Success");
  }

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div>
      <MerchantBar />
      <div className="res-items-to-be-left">
        <h1>Account</h1>
        <h2>Add Restaurant:</h2>
      </div>

      <div className="m-centre-items">
        <div className="google-gugu">
          <MerchantGoogle />
        </div>
        <div className="register-res">
          <form action="POST">
            <input
              type="text"
              onChange={(e) => {
                setrestName(e.target.value);
              }}
              placeholder="Restaurant Name"
            />
            {/* <input
              type="text"
              onChange={(e) => {
                setresAddress(e.target.value);
              }}
              placeholder="Restaurant Address"
            /> */}

            <input
              type="text"
              onChange={(e) => {
                setcontactNo(e.target.value);
              }}
              placeholder="Restaurant Contact number"
            />
            <input
              type="text"
              onChange={(e) => {
                setcuisine(e.target.value);
              }}
              placeholder="Cuisine"
            />
            {/* <input
              type="text"
              onChange={(e) => {
                setprice(e.target.value);
              }}
              placeholder="Price"
            /> */}
            {/* <div>
              <PriceRangeDropdown />
            </div> */}
            {/* <label htmlFor="price-range">Price range:</label> */}
            <div className="price-drop-down">
              <select
                id="price-range"
                value={priceRange}
                onChange={handlePriceChange}
                style={{
                  width: "540px",
                  height: "3rem",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  fontSize: "18px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select an option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <input type="submit" onClick={submit} />
          </form>
        </div>
      </div>
    </div>
  );
}
export default MerchantAddRestaurant;
