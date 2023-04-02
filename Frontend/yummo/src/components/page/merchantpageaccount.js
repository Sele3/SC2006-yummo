import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantpageaccount.css";
import avatar from "../../components/yummo_profile.png";
import { useAuth } from "../../hooks/useAuth";

function MerchantPageAccount(props) {
  const rootPath = "../../../../../Backend/";
  const url = "http://localhost:8000/api/users/profile";
  const { token } = useAuth();

  const [mid, setmID] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [bio, setBio] = useState("");

  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (token)
      axios
        .get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setmID(response.data.user.id);
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

  const discard = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNo("");
    setUserName("");
    setBio("");
  };

  const DataSending = {
    user: {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
    },
    bio: bio,
    contact_no: contactNo,
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   console.log("saved");
  //   save();
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="merchantpageaccount">
      <div className="items-to-be-left">
        <h1>Account</h1>
        <h2>Merchant Information:</h2>
        <h3> Avatar </h3>
        <p></p>
        <div className="img-and-username">
          <img
            src={avatar}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "20%" }}
          />
          <h4 className="welcome-msg">
            Merchant: "<span class="blue-text">{username}</span>"
          </h4>
        </div>
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="contactNo">Contact Number</label>
            <input
              id="contactNo"
              type="text"
              value={contactNo}
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
              placeholder="Contact Number"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <div className="merch-id">
          <div className="form-group">
            <label htmlFor="username">Merchant Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Merchant Username"
              style={{ width: "200px" }}
            />
          </div>
          <div className="form-group">
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

        <div className="merchant-acc-pg-buttons">
          <div className="m-save-discard">
            <input type="submit" value="Discard Changes" onClick={discard} />
            <input
              type="submit"
              value="Save Changes"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantPageAccount;
