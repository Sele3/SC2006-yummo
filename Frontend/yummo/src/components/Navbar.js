import { NavLink } from "react-router-dom";
import LogoDefault from "./LogoDefault";
import LogoMerchant from "./LogoMerchant";
import styles from "./Navbar.module.css";

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
      name: "Friends",
      path: "/blog",
    },
    {
      name: "My Reservations",
      path: "/contact",
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
    </nav>
  );
}

export default NavBar;