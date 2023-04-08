import React, { useState, useEffect } from "react";
import "./merchantRegister.css";
import logo from "../../components/merchant.png";
import bottomlogo from "../../components/bottomlogo.png";
import backImage from "../../components/MBackground.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [username, setUsername] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkPasswordStrength(pass)) {
      alert(
        "Password must be at least 8 characters long and contain at least one special character and one letter or digit."
      );
      return;
    }

    if (pass !== confirmPass) {
      alert("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (!isChecked1 || !isChecked2) {
      alert("Please tick all checkboxes.");
      return;
    }

    axios
      .post("http://localhost:8000/auth/users/", {
        email: email,
        password: pass,
        username: username,
        group_name: "Merchants",
      })

      .then((response) => {
        console.log("activated");
        console.log(response.data);
        console.log(response.data["auth_token"]);
        navigate("/merchantlogin");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPass(e.target.value);
  };

  const Checkbox1 = ({ isChecked1, handleCheckboxChange1 }) => {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          1. I agree to receive communication such as but not limited to status
          of my application, reminders, updates via Yummo’s approved third party
          communication platform. This field is required.
        </label>
      </div>
    );
  };

  const Checkbox2 = ({ isChecked2, handleCheckboxChange2 }) => {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          2. By proceeding, I agree that Yummo can collect, use and disclose the
          information provided by me, on behalf of the applicant company,in
          accordance with Yummo’s Privacy Notice which I have read and
          understand.
        </label>
      </div>
    );
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  function checkPasswordStrength(password) {
    const hasMinimumLength = password.length >= 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMixedCharacters =
      /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

    return hasMinimumLength && hasSpecialCharacter && hasMixedCharacters;
  }

  return (
    <div className="register-items">
      <div className="bar">
        <img
          src={logo}
          alt="Merchant logo"
          style={{ paddingLeft: "8rem", color: "white" }}
        />
        <img
          src={bottomlogo}
          alt="Merchant bottomlogo"
          style={{ position: "fixed", bottom: 30, left: 40 }}
        />
      </div>
      <div className="side-by-side">
        <div className="display-img">
          <img src={backImage} alt="Background Image" />
        </div>
        <div className="register-infos">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Yummo partner merchant sign up:</h2>
            <p>
              Enter your details to get started. Upon submission, you should
              receive the registration instructions in your email provided
              below.
            </p>
            <div className="email-item-only">
              <label htmlFor="username"></label>
              <input
                value={username}
                onChange={handleUserNameChange}
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="email-item-only">
              <label htmlFor="email"></label>
              <input
                className="email-input"
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="yummo@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div className="email-item-only">
              <label htmlFor="password"></label>
              <input
                value={pass}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
            </div>
            <div className="email-item-only">
              <label htmlFor="confirmPassword"></label>
              <input
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
            <div className="chkbox-submit">
              <Checkbox1
                isChecked1={isChecked1}
                handleCheckboxChange1={handleCheckboxChange1}
              />
              <Checkbox2
                isChecked2={isChecked2}
                handleCheckboxChange2={handleCheckboxChange2}
              />
              <button
                className="submit-button"
                type="submit"
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
