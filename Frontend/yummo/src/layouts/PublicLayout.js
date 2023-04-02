import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function HomeLayout() {
  const { user, isMerchant } = useAuth();

  if (user) {
    if (isMerchant) {
      return <Navigate to="/merchant" />;
    }
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default HomeLayout;