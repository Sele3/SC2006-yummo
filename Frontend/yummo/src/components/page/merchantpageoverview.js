import React from 'react';
import BarGraph from './BarGraph';
import './centre.css';
import './sidebar.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const data = [23, 45, 67, 89, 12, 34, 56];
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
      
    
    
    return (
    <div>
        <div className="sidebar">
            <button className="sidebar-item" onClick="window.location.href= 'localhost:3000/merchantoverview';" >Overview</button>
            <button className="sidebar-item">Account</button>
            <button className="sidebar-item">Merchant Reviews</button>
            <button className="sidebar-item">Security</button>
            <button className="sidebar-item">Boost Restaurant</button>
            
            </div>
            
        <div className="centre">
            <h1>Reservation Stats</h1>
            <h2>{date2} to {date}</h2> 
            <BarGraph data={data} />
        </div>
        <GetReviews/>
        <GetReservations/>
        
    </div>
  );
};
function GetReservations(){
    const [reservations, setReservations] = useState({});
    async function getreservations(){
        axios.get("http://127.0.0.1:8000/api/restaurants/"+restId+"/reservations")
            .then((response) => {
                 setReservations(response['data'])
            })
  .catch((err) => console.log(err));
    console.log(reservations);
    }
    return(
        <div className="centre">
            <h1>Upcoming Reservations</h1>
            <input type="submit" value="See Reservations" onClick={getreservations}/>
            {Object.keys(reservations).map((key) => (
                <div className = "sidebar-item" key={key}>
                    <p>Customer Name: {reservations[key].customer_name}</p>
                    <p>Rating: {reservations[key].rating}</p>
                    <p>Comments: {reservations[key].description}</p>
                </div>
        ))} 
            

            
        </div>
    )
}
function GetReviews(){
    const [reviews, setReviews] = useState({});
    async function getreviews(){
        axios.get("http://127.0.0.1:8000/api/restaurants/"+restId+"/reviews")
            .then((response) => {
                 setReviews(response['data'])
            })
  .catch((err) => console.log(err));
    console.log(reviews);
    }
    return(
        <div className="centre">
            <h1>My restaurant Reviews</h1>
            <input type="submit" value="See Reviews" onClick={getreviews}/>
            {Object.keys(reviews).map((key) => (
                <div className = "sidebar-item" key={key}>
                    <p>Customer Name: {reviews[key].customer_name}</p>
                    <p>Rating: {reviews[key].rating}</p>
                    <p>Comments: {reviews[key].description}</p>
                </div>
        ))} 

            
        </div>
    )
}
export default App;
