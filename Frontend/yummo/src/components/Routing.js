import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.js";
import CustomerLayout from "../layouts/CustomerLayout.js";
import PublicLayout from "../layouts/PublicLayout.js";
import Customer_Signup from "./page/customersignup.js";
import Customer_Acc_Setting from "./page/Customer_Acc_Sett.js";
import LetsYummoCraving from "./page/letsyummocraving.js";
import Login from "./page/Login";
import MerchantDashboard from "../layouts/MerchantDashboard.js";
import RestaurantOverview from "./page/merchant/RestaurantOverview.js";
import MerchantAddRestaurant from "./page/merchantAddRestaurant.js";
import SuccessfullyAdded from "./page/merchantAddSuccessful.js";
import MerchantLogin from "./page/merchantLogin.js";
import MerchantPageAccount from "./page/merchantpageaccount.js";
import MerchantRegister from "./page/merchantRegister.js";
import MyReservations from "./page/myreservations.js";
import YummoConfirmation from "./page/yummoconfirmation.js";
import YummoReservation from "./page/yummoreservation.js";
import YummoSuggestions from "./page/yummosuggestions.js";
import MerchantLayout from "../layouts/MerchantLayout.js";
import LetsYummoLocation from "./page/_41letsyummolocation.js";
import RestaurantSelect from "./page/merchant/RestaurantSelect.js";

function Routing() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Customer_Signup />} />
          <Route path="/merchantLogin" element={<MerchantLogin />} />
          <Route path="/merchantRegister" element={<MerchantRegister />} />
        </Route>

        <Route element={<CustomerLayout />}>
          <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
          <Route path="letsyummocraving" element={<LetsYummoCraving />} />
          <Route path="yummosuggestions" element={<YummoSuggestions />} />
          <Route path="yummoreservation" element={<YummoReservation />} />
          <Route path="yummoconfirmation" element={<YummoConfirmation />} />
          <Route path="myreservations" element={<MyReservations />} />
          <Route
            path="/customeraccountsetting"
            element={<Customer_Acc_Setting />}
          />
        </Route>

        <Route path="/merchant" element={<MerchantLayout />}>
          <Route path="account" element={<MerchantPageAccount />} />
          <Route path="add-restaurant" element={<MerchantAddRestaurant />} />
          <Route path="successfully-added" element={<SuccessfullyAdded />} />

          <Route path="restaurant-select" element={<RestaurantSelect />} />

          <Route element={<MerchantDashboard />}>
            <Route index element={<RestaurantOverview />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default Routing;