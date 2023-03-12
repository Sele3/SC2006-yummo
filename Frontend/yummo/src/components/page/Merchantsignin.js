// merchantLogin.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Merchantsignin.css";
import logo from "./logo.svg";
import { Login } from "./merchantLogin";
import { Register } from "./merchantRegister";

function Merchantsignin() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  };
  return (
    <div className="Merchantsignin">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}

export default Merchantsignin;
