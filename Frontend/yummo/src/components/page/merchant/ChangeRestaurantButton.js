import CachedIcon from "@mui/icons-material/Cached";
import { COLOR_MERCHANT } from "../../../constants";
import styles from "./ChangeRestaurantButton.module.css";
import { useMerchantStore } from "../../../store";
import { shortenAddress } from "../../../utils";

function ChangeRestaurantButton() {
  const selectedRestaurant = useMerchantStore(
    (state) => state.selectedRestaurant
  );
  const setSelectedRestaurant = useMerchantStore(
    (state) => state.setSelectedRestaurant
  );

  if (selectedRestaurant === null) {
    return null;
  }

  const { name, address } = selectedRestaurant;

  return (
    <button
      className={styles.restaurantButton}
      style={{
        "--color": COLOR_MERCHANT,
      }}
      onClick={() => setSelectedRestaurant(null)}
    >
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.address}>{shortenAddress(address)}</div>
      </div>
      <CachedIcon className={styles.icon} />
    </button>
  );
}

export default ChangeRestaurantButton;