import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Customer_Acc_Sett.css";
import axios from "axios";

function Customer_Acc_Setting() {
  const [id, setID] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const url = "http://localhost:8000/api/users/profile";
  const { token } = useAuth();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [userData, setUserData] = useState({});

  const [passwordChanges, setPasswordChanges] = useState(false);
  const [newDeals, setNewDeals] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setID(response.data.user.id);
        setUserName(response.data.user.username);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setEmail(response.data.user.email);
        setBio(response.data.bio);
        setContactNo(response.data.contact_no);

        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleIDChange = (event) => {
    setID(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleContactChange = (event) => {
    setContactNo(event.target.value);
  };

  const DataSending = {
    user: {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    },
    bio: bio,
    contact_no: contact_no,
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(url, DataSending, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSavedSuccessfully(true);
      setShowSuccessModal(true);
      console.log(response.data); // Log the updated user data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img
          src="/yummo_logo.png"
          alt="Yummo logo"
          width="8%"
          style={{ paddingLeft: "3rem" }}
        />
        <div className="nav-container">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <div class="navbar-search">
                <form>
                <input type="text" placeholder="Search..." />
                <button type="submit"><i class="fa fa-search">Search</i></button>
                </form>
            </div> */}
            <li className="nav-item">
              <NavLink
                exact
                to="/letsyummolocation"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                FoodRecco
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Feed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                My Reservations
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
      <h2 className="account-heading">Account</h2>
      <form className="personal-info-form">
        <label className="input-fields-label">
          Username:
          <br></br>
          <input
            className="input-fields-input"
            type="text"
            name="username"
            value={username}
            placeholder="UserName"
            onChange={handleUserNameChange}
          />
          <br></br>
        </label>

        <label className="input-fields-label">
          Email:
          <br></br>
          <input
            className="input-fields-input"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </label>
        <br></br>

        <label className="input-fields-label">
          First Name:<br></br>
          <input
            className="input-fields-input"
            type="text"
            name="first_name"
            value={first_name}
            placeholder="First Name"
            onChange={handleFirstNameChange}
          ></input>
          <br></br>
        </label>

        <label className="input-fields-label">
          Last Name:<br></br>
          <input
            className="input-fields-input"
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Last Name"
            onChange={handleLastNameChange}
          ></input>
          <br></br>
        </label>

        <label className="input-fields-label">
          Bio:<br></br>
          <input
            className="input-fields-input"
            type="text"
            name="bio"
            value={bio}
            placeholder="Bio"
            onChange={handleBioChange}
          ></input>
          <br></br>
        </label>

        <label className="input-fields-label">
          Contact Number:<br></br>
          <input
            className="input-fields-input"
            type="text"
            name="contact_no"
            value={contact_no}
            placeholder="Contact Number"
            onChange={handleContactChange}
          ></input>
          <br></br>
        </label>

        <div className="buttons-container">
          <button className="save-changes-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Customer_Acc_Setting;