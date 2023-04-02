import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useMerchantStore } from "../../../store";
import { assetUrl, shortenAddress } from "../../../utils";
import { fetchRestaurants } from "./queries";
import AddIcon from "@mui/icons-material/Add";
import styles from "./RestaurantSelect.module.css";

function RestaurantSelect() {
  const { token } = useAuth();
  const restaurants = useMerchantStore((state) => state.restaurants);
  const setRestaurants = useMerchantStore((state) => state.setRestaurants);
  const setSelectedRestaurant = useMerchantStore(
    (state) => state.setSelectedRestaurant
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants(token).then((data) => setRestaurants(data));
  }, [setRestaurants, token]);

  function handleRestaurantClick(restaurant) {
    setSelectedRestaurant(restaurant);
    navigate("/merchant", { replace: true });
  }

  function handleAddRestaurantClick() {
    navigate("/merchant/add-restaurant");
  }

  return (
    <div className={styles.restaurantSelectOverlay}>
      <div className={styles.restaurantSelect}>
        {restaurants.length > 0 && (
          <>
            <h2 className={styles.title}>Choose a restaurant</h2>

            <ul className={styles.restaurants}>
              {restaurants.map((restaurant) => (
                <li
                  key={restaurant.resID}
                  className={styles.restaurant}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <img
                    src={assetUrl(restaurant.img)}
                    alt={`${restaurant.name} at ${restaurant.address}`}
                  />
                  <div className={styles.name}>{restaurant.name}</div>
                  <div className={styles.address}>
                    {shortenAddress(restaurant.address)}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <button className={styles.addButton} onClick={handleAddRestaurantClick}>
          <AddIcon />
          Add a restaurant
        </button>
      </div>
    </div>
  );
}

export default RestaurantSelect;