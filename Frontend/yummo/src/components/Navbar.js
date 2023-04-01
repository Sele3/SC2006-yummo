import { NavLink, Link } from "react-router-dom";
import LogoDefault from "./LogoDefault";
import LogoMerchant from "./LogoMerchant";
import styles from "./Navbar.module.css";
import axios from "axios";

const COLOR_DEFAULT = "#ffdd40";
const COLOR_MERCHANT = "#00aeb2";

const ROUTES = {
  customer: [
    {
      name: "FoodRecco",
      path: "/letsyummolocation",
    },
    {
      name: "Feed",
      path: "/about",
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
      name: "Reservations",
      path: "/merchant/reservations",
    },
    {
      name: "Reviews",
      path: "/merchant/reviews",
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
  const navRoutes = isMerchant ? ROUTES.merchant : ROUTES.customer;

  const handleLogoutClick = () => {
    const url = "http://127.0.0.1:8000/auth/token/logout/";
    const token = localStorage.getItem("authToken");
    axios.post(url, {}, {
        headers: {
            Authorization: `Token ${token}`,
            },
    })
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

      <ul className={styles.container}>
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
      <Link to="/">
            <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        fontSize: '1rem',
                        padding: '12px 24px',
                        backgroundColor: '#000000',
                        color: '#FFD600',
                        borderRadius: '2rem',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2rem',
                        border: 'none',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        cursor: 'pointer',
                        justifyContent: 'center',
                        marginLeft: '2rem',
                    }}
                    onClick={handleLogoutClick}
            >Logout</button>
    </Link>
    </nav>
  );
}

export default NavBar;