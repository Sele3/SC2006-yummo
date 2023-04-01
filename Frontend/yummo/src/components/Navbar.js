import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { COLOR_DEFAULT, COLOR_MERCHANT } from "../constants";
import LogoDefault from "./LogoDefault";
import LogoMerchant from "./LogoMerchant";
import styles from "./Navbar.module.css";
import ChangeRestaurantButton from "./page/merchant/ChangeRestaurantButton";

const routes = {
  customer: [
    {
      name: "FoodRecco",
      path: "/letsyummolocation",
    },
    {
      name: "Feed",
      path: "/feed",
    },
    {
      name: "My Reservations",
      path: "/myreservations",
    },
  ],
  merchant: [
    {
      name: "Overview",
      path: "/merchant",
    },
    {
      name: "Account",
      path: "/merchant/account",
    },
  ],
};

function NavBar({ isMerchant = false }) {
  const color = isMerchant ? COLOR_MERCHANT : COLOR_DEFAULT;
  const Logo = isMerchant ? LogoMerchant : LogoDefault;
  const navRoutes = isMerchant ? routes.merchant : routes.customer;

  const handleLogoutClick = () => {
    const url = "http://127.0.0.1:8000/auth/token/logout/";
    const token = localStorage.getItem("authToken");
    axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  };

  return (
    <nav
      className={styles.navbar}
      style={{
        "--color": color,
      }}
    >
      <NavLink to={isMerchant ? "/merchant" : "/"} className={styles.logo}>
        <Logo />
      </NavLink>

      <div className={styles.container}>
        <ul className={styles.navLinks}>
          {navRoutes.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                end
                className={({ isActive }) =>
                  isActive ? styles.active : styles.item
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {isMerchant && <ChangeRestaurantButton />}

        <Link to="/">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              fontSize: "1rem",
              padding: "12px 24px",
              backgroundColor: "#000000",
              color: "#FFD600",
              borderRadius: "2rem",
              fontFamily: "Roboto",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.2rem",
              border: "none",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer",
              justifyContent: "center",
              marginLeft: "2rem",
            }}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;