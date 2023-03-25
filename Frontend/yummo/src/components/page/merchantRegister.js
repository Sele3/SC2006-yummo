import React from "react";
import { useState, useEffect } from "react";
import logo from "../../components/merchant.png";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Register } from "./mRegister.jsx";

function MerchantRegister() {
  const [currentForm, setCurrentForm] = useState("login");
  return (
    <div>
      <Register />
    </div>
  );
}
export default MerchantRegister;
