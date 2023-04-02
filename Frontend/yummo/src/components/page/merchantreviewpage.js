import React, { useState , useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./merchantreviewpage.css";

import axios from "axios";


function MerchantReview() {


  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);


  const [restaurants, setRestaurants] = useState([]);
  // let resIDArray = null;

  const restaurants_url = 'http://localhost:8000/api/restaurants';
  const token = '5a99c68c923d65db2c51da84a736ddc6ac41a40a';

  // const token = localStorage.getItem('authToken');
  // const reviews_url = 'http://localhost:8000/api/restaurants';

//FOR MODAL
  // const [show, setShow] = useState(false);
  
  useEffect (() => {
    axios.get(restaurants_url, 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setRestaurants(response.data);

      // resIDArray = response.data.map(item => item.resID);
      // console.log(resIDArray);
      console.log(response.data);
      console.log("my restaurants length is:");
      console.log(restaurants.length);
      console.log(restaurants);
    })

    .catch (error => {
      console.log(error);
      console.log("cannot");

    })
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [reviews, setReviews] = useState([]);


  // Clear Reviews from screen
  function clearReviews() {
    setReviews([]);
  }

  // Display reviews on the page
  function displayReviews(reviews) {
    setReviews(reviews);
    // console.log("Reviews are: "+{reviews});
  }

    // Make API call to get reviews for selected restaurant
    useEffect(() => {



      if (selectedRestaurant) {

        const matchingRestaurant = restaurants.find(restaurant => JSON.stringify(restaurant.name) === JSON.stringify(selectedRestaurant));
        console.log(matchingRestaurant);
        if(matchingRestaurant){
        const resid = matchingRestaurant.resID;

        console.log("resiD isssssss : "+ JSON.stringify(resid));
       
        axios.get("http://localhost:8000/api/restaurants/" + JSON.stringify(resid) + "/reviews")
     
          .then(response => {
            const reviews = response.data;
            displayReviews(reviews);
          })
          .catch(error => {
            console.error(error);
          });
      }} else {
        clearReviews();
      }
    }, [selectedRestaurant, restaurants]);

  // Handle restaurant select change
  function handleRestaurantChange(event) {
    const selectedRestaurant = event.target.value;
    setSelectedRestaurant(selectedRestaurant);
  }

  

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <img src="/yummo_merchant_logo.png" alt="Yummo logo" width="10%" style={{ paddingLeft: "3rem"}}/>
      </nav>

      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="reviews">
        <h1>Your Restaurant Reviews</h1>
        <div className="reviews-selectrest">
          <label htmlFor="restaurant-select">Select a restaurant:</label>
          <select id="restaurant-select" value={selectedRestaurant} onChange={handleRestaurantChange}>
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant,index) => (
            
            <option key={restaurant.name} value={restaurant.name}>{restaurant.name}</option>
          ))}
          </select>
        </div>
        <div className="review-review">
          <h2>Reviews for {selectedRestaurant}</h2>
          <div className="review-container">
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <p>Rating: {review.rating}/5</p>
                  <p>Comment: {review.description}</p>
                  <p>Customer Name: {review.customer_name}</p>
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}



export default MerchantReview;
