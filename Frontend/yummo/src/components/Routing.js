import Test from "./page/test.js";
import LetsYummoLocation from "./page/_41letsyummolocation.js"
import AboutPage from "./page/aboutpage.js"
import { Routes, Route } from "react-router-dom";

function Routing() {
    return (
        <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        </Routes>
    );
}
export default Routing;