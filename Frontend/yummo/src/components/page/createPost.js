import { NavLink } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./createPost.module.css"

let i=1;
var url = 'http://localhost:8000/api/yummogroups/'+i+"/posts";
var token = "799bb4844eca153b80e68ea84c42a0d30cec24c8";
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
    if (image != null)
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
    <form class={styles.createPostForm} onSubmit={handleSubmit} encType="multipart/form-data">
      <label class={styles.createPostLabel}>
        Description:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <div className={styles.dropdownContent}>
      <select value={groupId} onChange={handleGroupIdChange}>
        <option value="">Choose Group</option>

        {Object.keys(res).map((key) => ( 
                <option value={res[key].group_id}>{res[key].name}</option>
               
        ))} 
      </select>
    </div>  
      <br />
      <label className={styles.fileUpload}>
        Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <button className={styles.submitButton} type="submit">Submit</button>
    </form>
    </div>
  );
}

export default UploadForm;
