import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  

  return (
    <>
      <nav className="navbar">
        <img src="/yummo_logo.png" alt="Yummo logo" width="8%" style={{ paddingLeft: "3rem"}}/>
        <div className="nav-container">
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item-main">
              <NavLink
                exact
                to="/letsyummolocation"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                FoodRecco
              </NavLink>
            </li>
            <li className="nav-item-main">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Feed
              </NavLink>
            </li>
            <li className="nav-item-main">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Friends
              </NavLink>
            </li>
            <li className="nav-item-main">
              <NavLink
                exact
                to="/myreservations"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                My Reservations
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;