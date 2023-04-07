import { NavLink } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./createPost.module.css"

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
    <form className={styles.createPostForm} onSubmit={handleSubmit}>
    <label className={styles.createPostLabel}>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label className={styles.createPostLabel}>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <div className="dropdown-content">
      
    </div>  
      <br />
      
      <br />
      <button className={styles.submitButton} type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UploadForm;