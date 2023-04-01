import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Customer_Acc_Sett.css';
import axios from 'axios';
import CreatePost from './createPost'
import './feed.css'
var res;
var i=0;
function Feed() {

  const url = 'http://localhost:8000/api/yummogroups';
  const token = '799bb4844eca153b80e68ea84c42a0d30cec24c8';
  
  const [res, setResponse] = useState({});
  const [posts, setPosts] = useState({});
  
  var getPostUrl = 'http://localhost:8000/api/yummogroups/'+i+"/posts";

   useEffect (() => {
    axios.get(url, 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setResponse(response['data']);
      console.log(response['data']);
    })

    .catch (error => {
      console.log(error);
    })
}, []);
   
async function getposts(param1){
  console.log(param1);
    axios.get('http://localhost:8000/api/yummogroups/'+param1+"/posts", 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
        setPosts(response['data']);
      console.log(response['data']);
      console.log(posts);
    })

    .catch (error => {
      console.log(error);
    })
    
}

 

  
  return (
   <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
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
      <div>
            <h1>Welcome to your feed. Click on the groups names to view your posts from that group</h1>
            <div>
            {Object.keys(res).map((key) => ( 
                <div className="left">
                    <p onClick={() => getposts(res[key].group_id)}>{res[key].name}</p>
                 
               </div>
               
        ))} 
        <div className='left'>
           <NavLink
                exact
                to="/createpost"
                activeClassName="active"
                className="new-post-button"
              >
                Create Post
              </NavLink>
        </div> 
        </div>
        {Object.keys(posts).map((key) => ( 
                    <div  className="centre">
                        <img class="img-rounded" src={posts[key].img!=null ? "http://127.0.0.1:8000"+posts[key].img : 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/10/0B4E75F9-5053-4BDA-B326-7E32C6E4FBD9.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'} onerror="this.remove(); this.src='https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/10/0B4E75F9-5053-4BDA-B326-7E32C6E4FBD9.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'" width="50%"/>
                        <p class="container">{posts[key].description}</p>
                    
                    </div>
                  ))}

            
        </div>
                  </div>
  );
}
export default Feed;

