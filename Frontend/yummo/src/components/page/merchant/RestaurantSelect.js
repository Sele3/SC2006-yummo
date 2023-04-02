import { useEffect } from "react";
import styles from "./RestaurantSelect.module.css";
import { fetchRestaurants, useMerchantStore } from "./store";
import { assetUrl, shortenAddress } from "./utils";

function RestaurantSelect() {
  const token = useMerchantStore((state) => state.token);
  const restaurants = useMerchantStore((state) => state.restaurants);
  const setRestaurants = useMerchantStore((state) => state.setRestaurants);
  const setSelectedRestaurant = useMerchantStore(
    (state) => state.setSelectedRestaurant
  );

  useEffect(() => {
    fetchRestaurants(token).then((data) => setRestaurants(data));
  }, [setRestaurants, token]);

  return (
    <div className={styles.restaurantSelect}>
      <h2 className={styles.title}>Choose a restaurant</h2>

      <ul className={styles.restaurants}>
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.resID}
            className={styles.restaurant}
            onClick={() => setSelectedRestaurant(restaurant)}
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
    </div>
  );
}

export default RestaurantSelect;