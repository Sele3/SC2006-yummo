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
import Feed from "./page/feed.js"
import CreatePost from "./page/createPost.js"

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
        <Route path="/customeraccountsetting" element={<Customer_Acc_Setting/>} />
        <Route path="/merchantoverview" element={<MerchantOverview />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/createPost" element={<CreatePost />} />
        </Routes>
    );
}
export default Routing;
