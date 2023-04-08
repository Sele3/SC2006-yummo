import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Customer_Acc_Sett.css';
import axios from 'axios';
import styles from './feed.module.css'
import { useAuth } from "../../hooks/useAuth";

function Feed() {

  const url = 'http://localhost:8000/api/user/yummogroups';
  const { token } = useAuth();
  const [userName, setUsername] = useState({});
  const [allGroups, setGroups] = useState({});
  const [res, setResponse] = useState({});
  const [posts, setPosts] = useState({});
  const [searchResults, setSearchResults] = useState([]);

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
      if (error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
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
      <div>
      <input type="text" placeholder="Search Groups" value={searchResults} onChange={e => setSearchResults(e.target.value)} />
    </div>
      <div>
            <h1 style={{ textAlign: 'center' }}>Welcome to your feed. To view your posts from a group, click on that group on the left.</h1>
            <div className={styles.left}>
            {Object.keys(allGroups).map((key) => ( 
                <div>
                    {allGroups[key].name === searchResults || searchResults=="" ? 
                    <div>
                      <p className={styles.left} onClick={() => getposts(allGroups[key].group_id)}>{allGroups[key].name}</p>
                      <div >
                      {Array.isArray(res) && !res.some((obj) => obj.group_id === allGroups[key].group_id) ?<input  type="button" className='button' value="join" onClick={()=>joinTheGroup(allGroups[key].group_id)}></input> : <input  type="button" className='button' value="Leave" onClick={()=>deletefromGroup(allGroups[key].group_id)}></input>}
                      </div>
                    </div>
                     : <p className={styles.left}></p>}
                 </div>))} 
        <div>
           <NavLink
                exact
                to="/createpost"
                activeClassName="active"
                className={styles.newPostButton}
              >
                Create Post
              </NavLink>
        </div> 
        <div>
           <NavLink
                exact
                to="/creategroup"
                activeClassName="active"
                className={styles.newPostButton}
              >
                Create Group
              </NavLink>
        </div> 
        </div>
        {Object.keys(posts).map((key) => ( 
                    <div className={styles.centre}>
                        <img class="img-rounded" src={posts[key].img!=null ? "http://127.0.0.1:8000"+posts[key].img : 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/10/0B4E75F9-5053-4BDA-B326-7E32C6E4FBD9.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'} onerror="this.remove(); this.src='https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/10/0B4E75F9-5053-4BDA-B326-7E32C6E4FBD9.jpeg?q=50&fit=contain&w=1140&h=&dpr=1.5'" width="50%"/>
                        <p className={styles.centre.p}>{posts[key].description}</p>
                    </div>
                  ))}

            
        </div>
                  </div>
  );
}
export default Feed;

