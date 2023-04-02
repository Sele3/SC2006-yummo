
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