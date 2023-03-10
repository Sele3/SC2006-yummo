import Test from "./page/test.js";
import LetsYummoLocation from "./page/_41letsyummolocation.js"
import { Routes, Route } from "react-router-dom";

function Routing() {
    return (
        <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/letsyummolocation" element={<LetsYummoLocation />} />
        </Routes>
    );
}
export default Routing;