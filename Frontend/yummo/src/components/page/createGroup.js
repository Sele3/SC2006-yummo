import { NavLink } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./createPost.css"

let i=1;
var url = 'http://localhost:8000/api/yummogroups/'+i+"/posts";
var token = localStorage.getItem("authToken");
const getPostUrl = 'http://localhost:8000/api/yummogroups';

function UploadForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const data = {
    "name": name,
    "description": description,
}

  useEffect (() => {

}, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post(getPostUrl, data,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      console.log(response);
      window.location.href = "/feed";
    })

    .catch (error => {
      console.log(error);
    })
      
  };

  return (
    <div>
    <nav className="navbar">
        <img  src="/yummo_logo.png" alt="Yummo logo" width="8%" style={{ paddingLeft: "3rem"}}/>
        <div className="nav-container">
        <ul className="nav-menu active">
            <li className="nav-item">
              <NavLink
                exact
                to="/letsyummolocation"
                activeClassName="active"
                className="nav-links"
              
              >
                FoodRecco
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/feed"
                activeClassName="active"
                className="nav-links"
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
              >
                My Reservations
              </NavLink>
            </li>
          </ul>
          
        </div>
      </nav>
    <form onSubmit={handleSubmit}>
    <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <div className="dropdown-content">
      
    </div>  
      <br />
      
      <br />
      <button className= "submit-button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UploadForm;
