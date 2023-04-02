import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "./Navbar";

function MerchantLayout() {
  const { token, isMerchant } = useAuth();

  if (!token) {
    return <Navigate to="/merchantlogin" />;
  }

  if (!isMerchant) {
    return <Navigate to="/letsyummolocation" />;
  }

  return (
    <>
      <NavBar isMerchant />
      <Outlet />
    </>
  );
}

export default MerchantLayout;