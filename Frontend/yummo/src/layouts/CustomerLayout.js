import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "./Navbar";

function CustomerLayout() {
  const { token, isMerchant } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isMerchant) {
    return <Navigate to="/merchant" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default CustomerLayout;