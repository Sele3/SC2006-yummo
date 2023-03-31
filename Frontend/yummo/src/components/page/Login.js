import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login()
{
    //This part is getting executed continuously onChange i.e. for every change in the boxes typed, lines before the submit will get executed
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [username, setUsername] = useState('')
    const state = {
                    "email":'',
                    "password": ''
    };
    //console.log(state);
    
    const url = 'http://localhost:8000/auth/token/login/';
    const navigate = useNavigate();

    const DataSending = {
        "password": password,
        "email": email
    }
    

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(url, DataSending)
          .then(response => {
            // Save authentication token to local storage or cookies
            // localStorage.setItem('authToken', response.data.token);
            // Redirect to the dashboard page
            console.log(response.data);
            navigate('/feed');
          })
          .catch(error => {
            console.error(error);
          });
      }


    return(
        <div className="container">
           
            <div className="login">
                <img src="/yummo_logo.png" alt="Yummo logo" width="12%" style={{ paddingLeft: "4rem" , paddingTop: "2rem"}}/>
                <div className="login-form">
                    <form   action="POST">
                        <h1>Login</h1>

                        <div className="txt-field">
                            <label>
                                Email:<br></br>
                                <input 
                                type="text" 
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email} 
                                placeholder="Email" />
                                <br></br>
                            </label>
                        </div>

                        <div className="txt-field">
                            <label>
                                Password:<br></br>
                                <input 
                                type="text" 
                                onChange={(e)=>{setPassword(e.target.value)}} 
                                placeholder="Password" />
                            </label>
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