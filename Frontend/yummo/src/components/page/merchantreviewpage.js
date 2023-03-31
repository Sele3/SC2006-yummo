import React, { useState , useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import "./merchantreviewpage.css";
import ReviewBox from "./reviewbox";
import axios from "axios";


function MerchantReview() {
//   const [sidebarVisible, setSidebarVisible] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [resID, setResID] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [img, setImg] = useState('');
  const [cuisine, setCuisine] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [avg_rating, setAvgRating] = useState('');
  const [price, setPrice] = useState([]);
  const [merchant, setMerchant] = useState('');
  const [merchant_name, setMerchantName] = useState('');
  const [location, setLocation] = useState('');
  


  const restaurants_url = 'http://localhost:8000/api/restaurants';
  const token = '5a99c68c923d65db2c51da84a736ddc6ac41a40a';
  
  useEffect (() => {
    axios.get(restaurants_url, 
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
    .then(response => {
      setResID(response.data.resID);
      setName(response.data.name);
      setAddress(response.data.address);
      setContactNo(response.data.contact_no);
      setImg(response.data.img);
      setCuisine(response.data.cuisine);
      setCuisines(response.data.cuisines);
      setAvgRating(response.data.avg_rating);
      setPrice(response.data.price);
      setMerchant(response.data.merchant);
      setMerchantName(response.data.merchant_name);
      setLocation(response.data.location);
      console.log(response.data);
      console.log(`Total number of restaurants: ${response.data}`);
    })

    .catch (error => {
      console.log(error);
      console.log("cannot");

    })
  }, []);

  // const handleViewReviewsClick = async () => {
  //   axios.get('http://localhost:8000/api/restaurants/{resID}/reviews');
  //   then( response =>{
  //       const reviews = response.data;
  //   })
  // };


  const restaurants = {
      "resID": resID,
      "name": name,
      "address": address,
      "contact_no": contact_no,
      "img": img,
      "cuisine": cuisine,
      "cuisines": cuisines,
      "avg_rating": avg_rating,
      "price": price,
      "merchant": merchant,
      "merchant_name": merchant_name,
      "location": location
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
        <div className="reviews-container">
            <h3>Select the restaurant:</h3>
            <GetReviews resID = {restaurants.resID} />
            <div className="looping">
              {restaurants.map((resID) => (
                <div className="review-box">
                  <button>${resID}</button>
                </div>
              ))}
            </div>
            {/* <div className"reviews-link-container">
                {restaurants.map(restaurant => (
                    <ReviewBox key={resID} restaurant={restaurant} />
                ))} 
                
            </div> */}
        </div>

      </div>
    </div>
  );
}


function GetReviews(props){
  // const [restaurants, setRestaurants] = useState({restaurants});
  const [reviews, setReviews] = useState({});
  async function getreviews(){
      axios.get("http://127.0.0.1:8000/api/restaurants/{props.resId}/reviews")
          .then((response) => {
               setReviews(response['data'])
          })
      .catch((err) => console.log(err));
      console.log(reviews);
  }
  return(
      <div className="centre">
          <h1>My restaurant Reviews</h1>
          <input type="submit" className='button' value="See Reviews" onClick={getreviews}/>
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


export default MerchantReview;
