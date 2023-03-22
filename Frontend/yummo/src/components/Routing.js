import Test from "./page/test.js";
import LetsYummoLocation from "./page/_41letsyummolocation.js"
import AboutPage from "./page/aboutpage.js"
import LetsYummoCraving from "./page/letsyummocraving.js"
import YummoSuggestions from "./page/yummosuggestions.js"
import MerchantOverview from "./page/merchantpageoverview"
import { Routes, Route } from "react-router-dom";
import Customer_Acc_Setting from "./page/Customer_Acc_Sett.js";

function Routing() {
    return (
        <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
        <Route path="/letsyummocraving" element={<LetsYummoCraving />} />
        <Route path="/yummosuggestions" element={<YummoSuggestions />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/customeraccountsetting" element={<Customer_Acc_Setting/>} />
        <Route path="/merchantoverview" element={<MerchantOverview />} />

        </Routes>
    );
}
export default Routing;