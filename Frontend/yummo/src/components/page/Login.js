import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import usePasswordToggle from '../../usePasswordToggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login()
{
    //This part is getting executed continuously onChange i.e. for every change in the boxes typed, lines before the submit will get executed
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [username, setUsername] = useState('')
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    const state = {
                    "username":'',
                    "password": ''
    };
    //console.log(state);
    
    const url = 'http://localhost:8000/auth/token/login/';
    const navigate = useNavigate();

    const DataSending = {
        "password": password,
        "username": username,
        "group_name": "Customers",
    }
    

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(url, DataSending)
          .then(response => {
            // Save authentication token to local storage or cookies
            localStorage.setItem('authToken', response.data.token);
            // Redirect to the dashboard page
            //console.log(response.data.token);
            navigate('/letsyummolocation');
          })
          .catch(error => {
            console.error(error);
            alert("Error! Try Again. ")
          });
      }


    return(
        <div className="container">
           
            <div className="login">
                <img src="/yummo_logo.png" alt="Yummo logo" width="22%" style={{ paddingLeft: "4rem" , paddingTop: "2rem"}}/>
                <div className="login-form">
                    <form   action="POST">
                        <h1>Login</h1>

                        <div className="txt-field">
                            <label>
                                Username:
                            </label>
                            <input 
                                type="text" 
                                onChange={(e)=>{setUsername(e.target.value)}}
                                value={username} 
                                placeholder="Username" />
                            
                        </div>

                        {/* <div className="txt-field">
                            <label>
                                Password:<br></br>
                                <input 
                                type="password" 
                                onChange={(e)=>{setPassword(e.target.value)}} 
                                placeholder="Password" />
                            </label>
                        </div> */}
                        <div className="txt-field">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon="lock" />
                                </span>
                            </div>
                            <label>
                                <h4>Password:</h4>
                                <input
                                    className="form-control"
                                    placeholder="Create password"
                                    type={PasswordInputType}
                                    value={password}
                                    // onFocus={() => setPasswordFocused(true)}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                />
                            </label>
                            <span className="password-toogle-icon">
                                {ToggleIcon}
                            </span>
                        </div>

                        <br></br>

                        <div className="m-buttons">
                            <button className="login-button" onClick={handleSubmit}>Login</button>
                            <a href="/merchantlogin" >Merchant Login</a>
                        </div>

                        <div className="signup-link">
                            <a href="./signup">Sign Up</a>
                        </div>

                    </form>
                </div>
            </div>
            <div className="image-container">
                <img src="/medialogin_img.png" alt="login_img" width="100%" style={{ paddingLeft: "3rem"}}/>
            </div>
        </div>
    )
}
export default Login