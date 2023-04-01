import { Outlet } from "react-router-dom";
import LogoMerchant from "../../LogoMerchant";
import NavBar from "../../Navbar";
import styles from "./MerchantDashboard.module.css";
import RestaurantSelect from "./RestaurantSelect";
import { useMerchantStore } from "./store";

function MerchantDashboard() {
  const selectedRestaurant = useMerchantStore(
    (state) => state.selectedRestaurant
  );

  if (selectedRestaurant === null) {
    return (
      <div className={styles.restaurantSelectOverlay}>
        <LogoMerchant />
        <RestaurantSelect />;
      </div>
    );
  }

  return (
    <>
      <NavBar isMerchant />
      <Outlet />
    </>
  );
}

export default MerchantDashboard;