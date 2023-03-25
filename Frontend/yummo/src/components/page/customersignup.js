import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import './customersignup.css';
import axios from 'axios';
import usePasswordToggle from '../../usePasswordToggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Customer_Signup() {
  const [id, setID] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const url = 'http://localhost:8000/auth/users/';

    const user = {
        "username": username,
        "password": password,
        "email": email      
   }

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    try {
      const response = await axios.post(url, user);
      console.log(response.data);
      alert("Account created successfully!"); // Log the updated user data
      navigate('/feed');
    } 
    catch (error) {
      console.error(error);
    }
  };



   const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  



  return (
    <div className='wholepg'>
        <div className='navbar'>
        <nav>
        <img src="/yummo_logo.png" alt="Yummo logo" width="8%" style={{ paddingLeft: "3rem"}}/>
        </nav>
        </div>

        <div className="below-nav-bar" >
            
            <div className='form-container'>
                <form className="personal-info-form" >
                    <h2 className='account-heading'>SignUp</h2>

                    <div className="txt-field">
                            <label>
                                Username:<br></br>
                                <input 
                                type="text" 
                                onChange={handleUserNameChange} 
                                placeholder="UserName" />
                            </label>
                    </div>

                    <div className="txt-field">
                            <label>
                                Email:<br></br>
                                <input 
                                type="text" 
                                onChange={handleEmailChange}
                                value={email} 
                                placeholder="Email" />
                                <br></br>
                            </label>
                        </div>
{/* 

                    <div className="txt-field">
                            <label>
                                Password:<br></br>
                                <input 
                                type="text" 
                                onChange={handlePasswordChange} 
                                placeholder="Password" />
                            </label>
                            <span className="password-toogle-icon">
                                        {ToggleIcon}
                            </span>
                    </div> */}
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <FontAwesomeIcon icon="lock" />
                            </span>
                        </div>
                        <label>
                            Password:<br></br>
                            <input
                                className="form-control"
                                placeholder="Create password"
                                type={PasswordInputType}
                                value={password}
                                // onFocus={() => setPasswordFocused(true)}
                                onChange={handlePasswordChange}
                            />
                        </label>
                        <span className="password-toogle-icon">
                            {ToggleIcon}
                        </span>
                    </div>

                    <div className="buttons-container">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <div className='img-container'>
            <img src="/mediacust_signup.png" alt="signup_img" width="35%" />
        </div>

    </div>

  );
}

export default Customer_Signup;

