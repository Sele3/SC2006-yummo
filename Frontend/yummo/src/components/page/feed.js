import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from "react-router-dom";
import './Customer_Acc_Sett.css';
import axios from 'axios';
import './feed.css'

function Feed() {

  const url = 'http://localhost:8000/api/user/yummogroups';
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [userName, setUsername] = useState({});
  const [allGroups, setGroups] = useState({});
  const [res, setResponse] = useState({});
  const [posts, setPosts] = useState({});
  const [searchResults, setSearchResults] = useState([]);

   useEffect (() => {
    console.log(token);
    if(token==null) {
      navigate('/');
    }
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

    axios.get("http://localhost:8000/auth/users/me/", 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setUsername(response['data'].username);
      console.log(response['data'].username);
    })

    .catch (error => {
      console.log(error);
    })

    axios.get('http://localhost:8000/api/yummogroups', 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setGroups(response['data']);
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

async function deletefromGroup(param1){
  console.log(param1);
    axios.delete('http://localhost:8000/api/yummogroups/'+param1, 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
        console.log(response);
    })

    .catch (error => {
      console.log(error);
    })
    window.location.reload();
    
}

async function joinTheGroup(param1){
  console.log(param1);
    axios.post('http://localhost:8000/api/yummogroups/'+param1, {'grpID': param1},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
        console.log(response);
    })

    .catch (error => {
      console.log(error);
    })
    window.location.reload();
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
      <input type="text" placeholder="Search Groups" value={searchResults} onChange={e => setSearchResults(e.target.value)} />
    </div>
      <div>
            <h1>Welcome to your feed. Click on the groups names to view your posts from that group</h1>
            <div>
            {Object.keys(allGroups).map((key) => ( 
                <div>
                    {allGroups[key].name === searchResults || searchResults=="" ? 
                    <div>
                      <p onClick={() => getposts(allGroups[key].group_id)}>{allGroups[key].name}</p>
                      <div >
                      {!(res.some((obj) => obj.group_id === allGroups[key].group_id)) ?<input  type="button" className='button' value="join" onClick={()=>joinTheGroup(allGroups[key].group_id)}></input> : <input  type="button" className='button' value="Leave" onClick={()=>deletefromGroup(allGroups[key].group_id)}></input>}
                      </div>
                    </div>
                     : <p></p>}
                 </div>
               
               
        ))} 
        <div>
           <NavLink
                exact
                to="/createpost"
                activeClassName="active"
                className="new-post-button"
              >
                Create Post
              </NavLink>
        </div> 
        <div>
           <NavLink
                exact
                to="/creategroup"
                activeClassName="active"
                className="new-post-button"
              >
                Create Group
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

