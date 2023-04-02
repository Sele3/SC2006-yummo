import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const { login } = useAuth();

  const url = `${BACKEND_URL}/auth/token/login/`;

  const DataSending = {
    password: password,
    username: username,
    group_name: "Customers",
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(url, DataSending)
      .then((response) => {
        login(response.data.token, false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error! Try Again. ");
      });
  }

  return (
    <div className="container-loginpage">
      <div className="login">
        <img
          src="/yummo_logo.png"
          alt="Yummo logo"
          width="22%"
          style={{ paddingLeft: "4rem", paddingTop: "2rem" }}
        />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="txt-field">
              <label>Username:</label>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                placeholder="Username"
              />
            </div>

            <div className="txt-field">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FontAwesomeIcon icon="lock" />
                </span>
              </div>
              <label>
                <label>Password:</label>
                <input
                  className="form-control"
                  placeholder="Create password"
                  type={PasswordInputType}
                  value={password}
                  // onFocus={() => setPasswordFocused(true)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <span className="password-toogle-icon">{ToggleIcon}</span>
            </div>

            <br></br>

            <div className="m-buttons">
              <button className="login-button" onClick={(handleSubmit)}>Login</button>
              <a href="/merchantlogin">Merchant Login</a>
            </div>

            <div className="signup-link">
              <a href="./signup">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
      <div className="image-container">
        <img
          src="/medialogin_img.png"
          alt="login_img"
          width="100%"
          style={{ paddingLeft: "3rem" }}
        />
      </div>
    </div>
  );
}
export default Login;