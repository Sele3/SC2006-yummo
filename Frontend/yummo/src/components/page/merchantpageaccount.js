import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantpageaccount.css";
import Mnavbar from "../../components/Mnavbar.js";
import MerchantBar from "../../components/MerchantBar.js";
import avatar from "../../components/yummo_profile.png";

function MerchantPageAccount() {
  const rootPath = "../../../../../Backend/";
  const geturl = "http://127.0.0.1:8000/auth/users/";
  const posturl = "http://127.0.0.1:8000/auth/users/";

  const [mid, setmID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephonenumber, setTelephoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [MerUsername, setMerUsername] = useState("");

  const information = {
    firstName: "Raymond",
    lastName: "Ong",
    email: "shilifang@gmail.com",
    telephonenumber: "68708888",
    MerUsername: "Ray288",
    bio: "Happy These days",
  };

  const discard = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTelephoneNumber("");
    setMerUsername("");
    setBio("");
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
      MerUsername,
      bio,
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

  return (
    <div className="merchantpageaccount">
      {/* <div class="merchant-info"> */}
      <div style={{ position: "relative" }}>
        <MerchantBar />
        {/* <Mnavbar /> */}
      </div>
      <div className="items-to-be-left">
        <h1>Account</h1>
        <h2>Merchant Information:</h2>
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
            <label htmlFor="merchIDInput">Merchant Username</label>
            <input
              id="merchIDInput"
              type="text"
              value={MerUsername}
              onChange={(e) => {
                setMerUsername(e.target.value);
              }}
              placeholder="Merchant Username"
              style={{ width: "200px" }}
            />
          </div>
          <div class="form-group">
            <label htmlFor="bioInput">Bio</label>
            <input
              id="Bio"
              type="text"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              placeholder="Bio"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        {/* <h4>Email notifications:</h4>
        <h5></h5> */}
        <div class="m-container">
          <div className="merchant-acc-pg-buttons">
            <div>
              <button
                className="m-log-out"
                type="submit"
                onClick={() => (window.location.href = "/merchantLogin")}
              >
                Logout
              </button>
            </div>

            <div className="m-save-discard">
              <input type="submit" value="Discard Changes" onClick={discard} />
              <input type="submit" value="Save Changes" onClick={save} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantPageAccount;
