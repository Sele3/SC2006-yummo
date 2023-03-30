import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faChartBar,
  faUserAlt,
  faThList,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

import MerchantBar from "./MerchantBar.js";
import "./Mnavbar.css";
import bottomlogo from "./bottomlogo.png";
import { Routes, Route } from "react-router-dom";
// import MerchantPageAccount from "./page/merchantpageaccount.js";
// import MerchantAddRestaurant from "./page/merchantAddRestaurant.js";

function Mnavbar(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarVisible(!sidebarVisible);
  //   if (!sidebarVisible) {
  //     document.body.classList.add("sidebar-open");
  //     document.body.classList.remove("sidebar-closed");
  //   } else {
  //     document.body.classList.add("sidebar-closed");
  //     document.body.classList.remove("sidebar-open");
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    if (!sidebarVisible) {
      document.body.classList.add("sidebar-open");
      document.body.classList.remove("sidebar-closed");
      document
        .querySelector(".sidebar-container")
        .classList.add("sidebar-visible");
    } else {
      document.body.classList.add("sidebar-closed");
      document.body.classList.remove("sidebar-open");
      document
        .querySelector(".sidebar-container")
        .classList.remove("sidebar-visible");
    }
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    document.body.classList.add("sidebar-closed");
    document.body.classList.remove("sidebar-open");
    document
      .querySelector(".sidebar-container")
      .classList.remove("sidebar-visible");
  };

  return (
    <div className="sidebar-container">
      <div className="Mnavbar">
        {/* <MerchantBar />  */}
        <div>
          <div className="befpressing">
            <div className="sidebar-button-bar" onClick={toggleSidebar}>
              {props.visible ? (
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    marginLeft: "240px",
                    marginTop: "10px",
                    fontSize: "24px",
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                    fontSize: "24px",
                  }}
                />
              )}
              <img1
                src={bottomlogo}
                alt="Merchant bottomlogo"
                style={{ position: "fixed", bottom: 30, left: 40 }}
              />
            </div>
          </div>
          {sidebarVisible && (
            <div className="sidebar">
              <div className="sidebar-button-bar" onClick={closeSidebar}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                    fontSize: "24px",
                  }}
                />
              </div>
              <span className="msidebar-item-setting">Setting</span>
              {/* <Routes> */}
              <button
                className="msidebar-item"
                onClick={() => (window.location.href = "/merchantoverview")}
              >
                <FontAwesomeIcon icon={faChartBar} />
                &nbsp; <strong>Overview</strong>
                <span class="description">Restaurant Information</span>
              </button>

              <button
                className="msidebar-item"
                onClick={() => (window.location.href = "/merchantPageAccount")}
              >
                <FontAwesomeIcon icon={faUserAlt} />
                &nbsp; <strong>Account</strong>
                <span class="description">Merchant Information</span>
              </button>

              <button
                className="msidebar-item"
                onClick={() =>
                  (window.location.href = "/MerchantAddRestaurant")
                }
              >
                <FontAwesomeIcon icon={faCommentAlt} />
                &nbsp; <strong>Merchant Reviews</strong>
                <span class="description">Based On Locations</span>
              </button>

              <button
                className="msidebar-item"
                onClick={() =>
                  (window.location.href = "/MerchantAddRestaurant")
                }
              >
                <FontAwesomeIcon icon={faThList} />
                &nbsp; <strong>Restaurant</strong>
                <span class="description">Add Restaurants</span>
              </button>

              <img
                src={bottomlogo}
                alt="Merchant bottomlogo"
                style={{ position: "fixed", bottom: 30, left: 40 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mnavbar;
