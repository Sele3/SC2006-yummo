import Test from "./page/test.js";
import LetsYummoLocation from "./page/_41letsyummolocation.js";
import AboutPage from "./page/aboutpage.js";
import LetsYummoCraving from "./page/letsyummocraving.js";
import YummoSuggestions from "./page/yummosuggestions.js";
import YummoReservation from "./page/yummoreservation.js";
import YummoConfirmation from "./page/yummoconfirmation.js";
import MerchantOverview from "./page/merchantpageoverview";
import Login from "./page/Login";
import { Routes, Route } from "react-router-dom";
import Customer_Acc_Setting from "./page/Customer_Acc_Sett.js";
import Customer_Signup from "./page/customersignup.js";
import NavBar from "./Navbar.js";
import { Outlet } from "react-router-dom";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Customer_Signup />} />
      <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
      <Route path="/letsyummocraving" element={<LetsYummoCraving />} />

      <Route
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/yummosuggestions" element={<YummoSuggestions />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/yummoreservation" element={<YummoReservation />} />
        <Route path="/yummoconfirmation" element={<YummoConfirmation />} />
        <Route
          path="/customeraccountsetting"
          element={<Customer_Acc_Setting />}
        />
      </Route>

      <Route
        path="/merchant"
        element={
          <>
            <NavBar isMerchant />
            <Outlet />
          </>
        }
      >
      </Route>
    </Routes>
  );
}
export default Routing;