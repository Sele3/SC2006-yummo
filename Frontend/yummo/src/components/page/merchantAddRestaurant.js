import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantAddRestaurant.css";
import Mnavbar from "../../components/Mnavbar.js";
import MerchantBar from "../../components/MerchantBar.js";
// import Map from "./resMap";
// import Locations from "./resLocations";
import GoogleLocation from './googlelocation.js'

function MerchantAddRestaurant() {
  const [markers, setMarkers] = useState([]);
  return (
    <div className="add-rest-all">
      <MerchantBar />
      <h>Account</h>
      <h>Merhcants</h>
      <GoogleLocation markers={markers} setMarkers={setMarkers} />
      
      
    </div>
  );
}
export default MerchantAddRestaurant;
