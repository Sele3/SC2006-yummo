import React from 'react';
import BarGraph from './BarGraph';
import './centre.css';
import './sidebar.css';
import './merchantpageoverview.css'
import axios from 'axios';
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

// const data = [23, 12, 34, 56];
//Replace with reservation data
var today = new Date();
var date2;
            const date = today.getDate() + '-' + (today.getMonth() + 1)+ '-' + (today.getFullYear());
            if(today.getMonth!==0)
             date2 = today.getDate() + '-' + (today.getMonth())+ '-' + (today.getFullYear());
            else
             date2 = today.getDate() + '-' + 12 + '-' + (today.getFullYear()-1);

var restId = 1;  
function App() {
    //var restId = axios.get();
      
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    return (
    <div>
        
        <div className="sidebar">
        <li className="sidebar-item">
              <NavLink
                exact
                to="/merchantoverview"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>Overview</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                exact
                to="/merchant"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>Account</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                exact
                to="/merchant"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>Reviews</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                exact
                to="/merchant"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>Security</NavLink>
            </li>
           
            
            </div>
            
        <div className="centre">
            <h1 className='heading'>Reservation Stats</h1>
            <h2>{date2} to {date}</h2> 
            <BarGraph />
        </div>
        <div className='left'>
        <GetReviews/>
        </div>
        <div className='right'>
        <GetReservations/>
        </div>
        
    </div>
  );
};
function GetReservations(){
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
      }
    const [reservations, setReservations] = useState({});
    async function getreservations(){
        const token = "5a99c68c923d65db2c51da84a736ddc6ac41a40a";
        console.log(token);
        axios.get("http://127.0.0.1:8000/api/restaurants/"+restId+"/reservations", {
            headers: {
                'Authorization': `Token ${token}`,
            },
          })
            .then((response) => {
                 setReservations(response['data'])
                 console.log(reservations)
            })
  .catch((err) => console.log(err));
    console.log(reservations);
    }
    return(
        <div className="centre">
            <h1>Upcoming Reservations</h1>
            <input type="submit" className='button' value="See Reservations" onClick={getreservations}/>
            {Object.keys(reservations).map((key) => (
                <div className = "sidebar-item" key={key}>
                    <p>Customer Name: {reservations[key].customer_name}</p>
                    <p>Pax: {reservations[key].pax}</p>
                    <p>Reserved At: {getFormattedDate(reservations[key].reserved_at)}</p>
                </div>
        ))} 
        </div>
    )
}

function GetReviews(){
    // const [reviews, setReviews] = useState({});
//     async function getreviews(){
//         axios.get("http://127.0.0.1:8000/api/restaurants/"+restId+"/reviews")
//             .then((response) => {
//                  setReviews(response['data'])
//             })
//   .catch((err) => console.log(err));
    // console.log(reviews);
    // }
    const navigate = useNavigate();

    async function getreviews(){
            navigate('/merchantreviewpage');
    }
    return(
        <div className="centre">
            <h1>My restaurant Reviews</h1>
            <input type="submit" className='button' value="See Reviews" onClick={getreviews}/>
            {/* {Object.keys(reviews).map((key) => (
                <div className = "sidebar-item" key={key}>
                    <p>Customer Name: {reviews[key].customer_name}</p>
                    <p>Rating: {reviews[key].rating}</p>
                    <p>Comments: {reviews[key].description}</p>
                </div>
        ))}  */}

            
        </div>
    )
}
export default App;
