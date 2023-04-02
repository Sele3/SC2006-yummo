import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMerchantStore } from "../store";

function MerchantDashboard() {
  const selectedRestaurant = useMerchantStore(
    (state) => state.selectedRestaurant
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRestaurant === null) {
      navigate("/merchant/restaurant-select", { replace: true });
    }
  }, [navigate, selectedRestaurant]);

  if (selectedRestaurant === null) {
    return null;
  }

  return <Outlet />;
}

export default MerchantDashboard;