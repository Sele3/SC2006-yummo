import { NavLink } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./createPost.css"

let i=1;
var url = 'http://localhost:8000/api/yummogroups/'+i+"/posts";
var token = localStorage.getItem("authToken");
const getPostUrl = 'http://localhost:8000/api/yummogroups';

function UploadForm() {
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [image, setImage] = useState(null);
  const [res, setResponse] = useState({});

  useEffect (() => {
    axios.get(getPostUrl, 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setResponse(response['data']);
      console.log(res);
    })

    .catch (error => {
      console.log(error);
    })
}, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleGroupIdChange = (event) => {
    setGroupId(event.target.value);
    url = 'http://localhost:8000/api/yummogroups/'+event.target.value+"/posts";
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("groupId", groupId);
    formData.append("img", image);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        console.log("Done");
        window.location.href = "/feed";
      })
      .catch((error) => {
        // handle error response
        console.log("Error");
      });
      
  };

  return (
    <div>
    <nav className="navbar">
        <img  src="/yummo_logo.png" alt="Yummo logo" width="8%" style={{ paddingLeft: "3rem"}}/>
        <div className="nav-container">
        <ul className="nav-menu active">
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <div className="dropdown-content">
      <select value={groupId} onChange={handleGroupIdChange}>
        <option value="">Choose Group</option>

        {Object.keys(res).map((key) => ( 
                <option value={res[key].group_id}>{res[key].name}</option>
               
        ))} 
      </select>
    </div>  
      <br />
      <label className="file-upload">
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <button className= "submit-button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UploadForm;
