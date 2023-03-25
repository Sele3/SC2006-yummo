import React from "react";
import { useState, useEffect } from "react";
import "./merchantLogin.css";
import logo from "../../components/merchant.png";
import instruction from "../../components/Instruction.png";
import axios from "axios";
import { Routes } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isInValidPassword, setIsInvalidPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/token/login/", {
        password: pass,
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data["auth_token"]);
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
    <div className="auth-form-container">
      <img
        src={logo}
        alt="Merchant logo"
        // width="8%"
        style={{ paddingLeft: "8rem" }}
      />
      <div className="left-right">
        <div className="login-detail">
          <h2>Welcome! </h2>
          <p>
            Sign in with your data that you entered during your registration.
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="yummo@gmail.com"
              id="email"
              name="email"
              style={{ height: "40px", width: "300px" }}
            />
            <label htmlFor="password">password</label>
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
                *Invalid password, please try again.
              </div>
            )}
            <button
              className="login-button"
              type="submit"
              onClick={() => {
                handleSubmit();
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
