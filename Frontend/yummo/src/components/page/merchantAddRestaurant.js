import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantAddRestaurant.css";
import MerchantGoogle from "./merchantGoogle.js";
import Mnavbar from "../../components/Mnavbar.js";
import MerchantBar from "../../components/MerchantBar.js";
import GoogleLocation from "./googlelocation.js";
// import * as React from "react";

function MerchantAddRestaurant() {
  // must change url!!
  const [markers, setMarkers] = useState([]);
  const [restName, setrestName] = useState({});
  const [resAddress, setresAddress] = useState({});
  const [contactNo, setcontactNo] = useState({});
  const [cuisine, setcuisine] = useState({});
  const [price, setprice] = useState({});
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
            <input
              type="text"
              onChange={(e) => {
                setresAddress(e.target.value);
              }}
              placeholder="Restaurant Address"
            />
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
            <input
              type="text"
              onChange={(e) => {
                setprice(e.target.value);
              }}
              placeholder="Price"
            />

            <input type="submit" onClick={submit} />
          </form>
        </div>
      </div>
    </div>
  );
}
export default MerchantAddRestaurant;
