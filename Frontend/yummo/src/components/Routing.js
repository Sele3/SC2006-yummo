import LetsYummoLocation from "./page/_41letsyummolocation.js";
import AboutPage from "./page/aboutpage.js";
import LetsYummoCraving from "./page/letsyummocraving.js";
import YummoSuggestions from "./page/yummosuggestions.js";
import YummoReservation from "./page/yummoreservation.js";
import YummoConfirmation from "./page/yummoconfirmation.js";
import MerchantDashboard from "./page/merchant/MerchantDashboard.js";
import Login from "./page/Login";
import { Routes, Route } from "react-router-dom";
import Customer_Acc_Setting from "./page/Customer_Acc_Sett.js";
import MerchantAddRestaurant from "./page/merchantAddRestaurant.js";
//import MerchantAddRestaurant from "./page/merchantAddRestaurant.js";
import RestaurantOverview from "./page/merchant/RestaurantOverview.js";
import MerchantPageAccount from "./page/merchantpageaccount.js";
import MerchantLogin from "./page/merchantLogin.js";
import MerchantRegister from "./page/merchantRegister.js";
import Customer_Signup from "./page/customersignup.js";
import SuccessfullyAdded from "./page/merchantAddSuccessful.js";
import MyReservations from "./page/myreservations.js";
import NavBar from "./Navbar.js";
import { Outlet } from "react-router-dom";
import Feed from "./page/feed.js"
import CreatePost from "./page/createPost.js"
import CreateGroup from "./page/createGroup.js"

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
      <Route path="/letsyummocraving" element={<LetsYummoCraving />} />
      <Route path="/yummosuggestions" element={<YummoSuggestions />} />
      <Route path="/aboutpage" element={<AboutPage />} />
      <Route path="/yummoreservation" element={<YummoReservation />} />
      <Route path="/yummoconfirmation" element={<YummoConfirmation />} />
      <Route
        path="/customeraccountsetting"
        element={<Customer_Acc_Setting />}
      />
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

      <Route path="/merchant" element={<MerchantDashboard />}>
        <Route index element={<RestaurantOverview />} />
      </Route>

      <Route path="/merchantPageAccount" element={<MerchantPageAccount />} />
      <Route path="/merchantLogin" element={<MerchantLogin />} />
      <Route path="/merchantRegister" element={<MerchantRegister />} />
      <Route path="/signup" element={<Customer_Signup />} />
      <Route path="/myreservations" element={<MyReservations />} />
      {/* <Route path="/merchantaddRestaurant" element={<MerchantAddRestaurant />} /> */}
      <Route
        path="/merchantaddRestaurant"
        element={<MerchantAddRestaurant />}
      />
      <Route path="/successfullyAdded" element={<SuccessfullyAdded />} />
      <Route path="/feed" element={<Feed />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/creategroup" element={<CreateGroup />} />
    </Routes>
  );
}
export default Routing;