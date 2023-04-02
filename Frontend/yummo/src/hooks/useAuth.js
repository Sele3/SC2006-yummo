import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMerchantStore } from "../store";
import { BACKEND_URL } from "../constants";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [isMerchant, setIsMerchant] = useState(
    localStorage.getItem("isMerchant") === "true"
  );
  const navigate = useNavigate();
  const clearMerchantStore = useMerchantStore((state) => state.clear);

  const value = useMemo(
    () => ({
      token,
      isMerchant,
      login: (token, isMerchant) => {
        setToken(token);
        setIsMerchant(isMerchant);
        localStorage.setItem("authToken", token);
        localStorage.setItem("isMerchant", isMerchant);
        if (isMerchant) {
          navigate("/merchant");
        } else {
          navigate("/letsyummolocation");
        }
      },
      logout: () => {
        setToken(null);
        setIsMerchant(false);
        clearMerchantStore();
        localStorage.removeItem("authToken");
        localStorage.removeItem("isMerchant");
        navigate("/", { replace: true });
      },
      getProfile: () => {
        return fetch(`${BACKEND_URL}/api/users/profile`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        }).then((res) => res.json());
      },
    }),
    [clearMerchantStore, isMerchant, navigate, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}