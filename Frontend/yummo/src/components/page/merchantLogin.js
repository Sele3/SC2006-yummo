import React from "react";
import { useState, useEffect } from "react";
import logo from "../../components/merchant.png";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Login } from "./mLogin.jsx";

function MerchantLogin() {
  const [currentForm, setCurrentForm] = useState("login");
  return (
    <div>
      <Login />
    </div>
  );
}
export default MerchantLogin;

//email@gmail.com
//password

// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import "./Merchantsignin.css";
// import { Login } from "./mLogin.jsx";
// import { Register } from "./merchantRegister.jsx";

// function Merchantsignin() {
//   const [currentForm, setCurrentForm] = useState("login");

//   const toggleForm = (forName) => {
//     setCurrentForm(forName);
//   };

//   return (
//     <div className="MerchantMainPage">
//       {currentForm === "login" ? (
//         <Login onFormSwitch={toggleForm} />
//       ) : (
//         <Register onFormSwitch={toggleForm} />
//       )}
//     </div>
//   );
// }

// export default Merchantsignin;
