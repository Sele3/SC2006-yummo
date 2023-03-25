import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./merchantRegister.css";
import logo from "../../components/merchant.png";
import bottomlogo from "../../components/bottomlogo.png";
import backImage from "../../components/MBackground.png";
import axios from "axios";

export const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [telephonenumber, setTelephoneNumber] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const finaldata = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: pass,
    confirmPass: confirmPass,
    telephonenumber: telephonenumber,
    isChecked1: isChecked1,
    isChecked2: isChecked2,
    merchantID: merchantID,
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (pass !== confirmPass) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   console.log(email);
  // };

  // set up config object for axios request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/auth/users/", {
        email: email,
        password: pass,
        username: merchantID,
      })

      .post("http://127.0.0.1:8000/auth/users/", {
        email: email,
        password: pass,
        username: merchantID,
      })
      
      .then((response) => {
        console.log(response.data);
        console.log(response.data["auth_token"]);
        window.location.href = "/merchantPageAccount";
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(email);
    // console.log(pass);
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
          <form className="register-form">
            <h2>Yummo partner merchant sign up:</h2> {/*header*/}
            <p>
              Enter your store details to get started. Upon submission, you
              should receive the registration instructions in your email
              provided below.
            </p>
            <div class="name-group">
              <label htmlFor="firstName">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
              <label htmlFor="lastName">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </div>
            <div className="email-item-only">
              <label htmlFor="email">Email</label>
              <input
                clasdName="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="yummo@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div class="pass-group">
              <label htmlFor="password">Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
            <div class="others-group">
              <label htmlFor="telephonenumber">Mobile Phone</label>
              <input
                value={telephonenumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                name="telePhonenumber"
                id="telePhonenumber"
                placeholder="98766543"
              />
              <label htmlFor="merchantID">Merchant Username</label>
              <input
                value={merchantID}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                name="merchantID"
                id="merchantID"
                placeholder="Merchant Username"
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
                onClick={() => {
                  if (pass !== confirmPass) {
                    alert("Passwords do not match");
                    handleSubmit();
                  }
                }}
              >
                Submit
              </button>
            </div>
          </form>
          {/* <button
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Log in here
          </button> */}
        </div>
      </div>
    </div>
  );
};
