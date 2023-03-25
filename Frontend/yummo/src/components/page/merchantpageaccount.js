import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantpageaccount.css";
import Mnavbar from "../../components/Mnavbar.js";
import MerchantBar from "../../components/MerchantBar.js";
import avatar from "../../components/musk.png";

function MerchantPageAccount() {
  const rootPath = "../../../../../Backend/";
  const geturl = "http://127.0.0.1:8000/auth/users/";
  const posturl = "http://127.0.0.1:8000/auth/users/";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephonenumber, setTelephoneNumber] = useState("");
  const [newPW, setNewPw] = useState("");
  const [merchantID, setMerchantID] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  const information = {
    firstName: "Raymond",
    lastName: "Ong",
    email: "shilifang@gmail.com",
    telephonenumber: "68708888",
    merchantID: "Ray288",
  };

  const discard = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTelephoneNumber("");
    setMerchantID("");
    setNewPw("");
  };

  const handleMenuOpen = () => {
    document.body.classList.add("menu-open");
  };

  const handleMenuClose = () => {
    document.body.classList.remove("menu-open");
  };

  const save = async (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email,
      telephonenumber,
      merchantID,
      newPW,
    };
    try {
      const response = await axios.post(posturl, user);
      console.log(user);
      console.log(response);
      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  useEffect(() => {
    console.log("saved");
    save();
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form (if desired)
  };

  const Checkbox1 = ({ isChecked1, handleCheckboxChange1 }) => {
    return (
      <div className="checkbox1">
        <label>
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          New Deals
        </label>
      </div>
    );
  };

  const Checkbox2 = ({ isChecked2, handleCheckboxChange2 }) => {
    return (
      <div className="checkbox2">
        <label>
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          Password Change
        </label>
      </div>
    );
  };

  const Checkbox3 = ({ isChecked3, handleCheckboxChange3 }) => {
    return (
      <div className="checkbox3">
        <label>
          <input
            type="checkbox"
            checked={isChecked3}
            onChange={handleCheckboxChange3}
          />
          New Reviews
        </label>
      </div>
    );
  };

  const Checkbox4 = ({ isChecked4, handleCheckboxChange4 }) => {
    return (
      <div className="checkbox4">
        <label>
          <input
            type="checkbox"
            checked={isChecked4}
            onChange={handleCheckboxChange4}
          />
          Newsletter
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
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleCheckboxChange4 = () => {
    setIsChecked4(!isChecked4);
  };

  return (
      <div className="merchantpageaccount">
        {/* <div class="merchant-info"> */}
        <div style={{ position: "relative" }}>
          <MerchantBar />
        </div>
        <div className="items-to-be-left">
          <h1>Account</h1>
          <h2>Restaurant Information</h2>
          <h3> Avatar </h3>
          <p></p>
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "20%" }}
          />
        </div>
        <div className="questionitems">
          <div className="names">
            <div class="form-group">
              <label htmlFor="firstNameInput">First Name</label>
              <input
                id="firstNameInput"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
                style={{ width: "200px" }}
              />
            </div>
            <div class="form-group">
              <label htmlFor="lastNameInput">Last Name</label>
              <input
                id="lastNameInput"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
                style={{ width: "200px" }}
              />
            </div>
          </div>

          <div className="email-and-tele">
            <div class="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
                id="emailInput"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Contact Email"
                style={{ width: "200px" }}
              />
            </div>
            <div class="form-group">
              <label htmlFor="telephoneInput">Telephone Number</label>
              <input
                id="telephoneInput"
                type="text"
                value={telephonenumber}
                onChange={(e) => {
                  setTelephoneNumber(e.target.value);
                }}
                placeholder="Telephone Number"
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <div className="merch-id">
            <div class="form-group">
              <label htmlFor="merchIDInput">User Name</label>
              <input
                id="merchIDInput"
                type="text"
                value={merchantID}
                onChange={(e) => {
                  setMerchantID(e.target.value);
                }}
                placeholder="merchant Username"
                style={{ width: "200px" }}
              />
            </div>
            <div class="form-group">
              <label htmlFor="newPWInput">New Password</label>
              <input
                id="newPWInput"
                type="text"
                value={newPW}
                onChange={(e) => {
                  setNewPw(e.target.value);
                }}
                placeholder="new Password"
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <h4>Email notifications</h4>
          <div className="checkboxes">
            <Checkbox1
              isChecked1={isChecked1}
              handleCheckboxChange1={handleCheckboxChange1}
            />
            <Checkbox2
              isChecked2={isChecked2}
              handleCheckboxChange2={handleCheckboxChange2}
            />
            <Checkbox3
              isChecked3={isChecked3}
              handleCheckboxChange3={handleCheckboxChange3}
            />
            <Checkbox4
              isChecked4={isChecked4}
              handleCheckboxChange4={handleCheckboxChange4}
            />
          </div>
          <h5></h5>
          <input type="submit" value="Save Changes" onClick={save} />
          <input type="submit" value="Discard Changes" onClick={discard} />
          <button type="submit">Logout</button>
        </div>
      </div>
  );
}

export default MerchantPageAccount;
