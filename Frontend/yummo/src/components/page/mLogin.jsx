import React from "react";
import { useState, useEffect } from "react";
import "./merchantLogin.css";
import logo from "../../components/merchant.png";
import instruction from "../../components/Instruction.png";
import axios from "axios";
import { Routes } from "react-router-dom";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [isInValidPassword, setIsInvalidPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/token/login/", {
        password: pass,
        username: username,
        group_name: "Merchants",
      })
      .then((response) => {
        const authToken = response.data["token"];
        console.log(response.data);
        console.log(authToken);
        // Set username and password in session storage
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", pass);
        sessionStorage.setItem("authToken", authToken);
        window.location.href = "/merchantPageAccount";
      })
      .catch((error) => {
        setIsInvalidPassword(true);
        console.error(error);
      });
    // console.log(email);
    // console.log(pass);
  };

  return (
    <div className="mlog-auth-form-container">
      <img
        src={logo}
        alt="Merchant logo"
        // width="8%"
        style={{ paddingLeft: "8rem" }}
      />
      <div className="left-right">
        <div className="mlogin-detail">
          <h2>Welcome! </h2>
          <p>
            Sign in with your data that you entered during your registration.
          </p>
          <form className="mlogin-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              placeholder="Username"
              id="username"
              name="username"
              style={{ height: "40px", width: "300px" }}
            />
            <label htmlFor="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
              style={{ height: "40px", width: "300px" }}
            />
            {isInValidPassword && (
              <div
                style={{
                  color: "red",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                *Invalid entry, please try again.
              </div>
            )}
            <button
              className="mlogin-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="reg-inst">
          <p2>Don't have a Merchant account?</p2>
          <button
            className="link-button"
            onClick={() => {
              window.location.href = "/merchantRegister";
            }}
          >
            Register as merchant
          </button>
          <h3>Producedure:</h3>
          <img src={instruction} alt="Instruction" />
        </div>
      </div>
    </div>
  );
};
