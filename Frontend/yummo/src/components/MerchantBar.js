import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./MerchantBar.css";
import Mnavbar from "./Mnavbar";
import logo from "./merchant.png";

function MerchantBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className="merchant-bar">
      <div className="merchant-navbar">
        <img
          src={logo}
          alt="Merchant logo"
          // width="8%"
          style={{ paddingLeft: "8rem" }}
        />
      </div>
      <Mnavbar style={{ marginTop: "1rem" }} />
    </div>
  );
}

export default MerchantBar;
