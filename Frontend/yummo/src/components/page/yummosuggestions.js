import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import axios from "axios";
import MapContainer from "../map.js";
import FilterDropdown from "../filterdropdown.js";
import { useAuth } from "../../hooks/useAuth";
import "./yummosuggestions.css";

export default function Yummosuggestions(props) {
  const location = useLocation();
  const { token } = useAuth();
  const state = location.state;
  const GOOGLEMAP_API_KEY = process.env.REACT_APP_GOOGLEMAP_API_KEY;

  // Currently values not used, waiting for backend to support the filter function.
  const [priceFilter, setPriceFilter] = useState(2);
  const [distanceFilter, setDistanceFilter] = useState(15000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [ratingToggle, setRatingToggle] = useState("DESC");
  const [rankby, setRankby] = useState("prominence");

  function handlePriceFiltered(value) {
    setPriceFilter(value);
  }

  function handleDistanceFiltered(value) {
    setDistanceFilter(value);
  }

  function handleRatingFiltered(value) {
    setRatingFilter(value);
  }

  useEffect(() => {
    if (ratingFilter === 0) {
      setRatingToggle("DESC");
    } else {
      setRatingToggle("ASC");
    }
  }, [ratingFilter]);

  useEffect(() => {
    if (distanceFilter === 0) {
      setRankby("prominence");
    } else {
      setRankby("distance");
    }
  }, [distanceFilter]);

  const url = "http://127.0.0.1:8000/api/restaurants/search";
  const data = {
    address: state.location,
    radius: distanceFilter,
    keyword: state.craving,
    rankby: rankby,
    price: priceFilter,
    rating: ratingToggle,
  };
  console.log(data);

  const [result, setResult] = useState({});

  const handleUpdateClick = () => {
    console.log("Update Clicked");
    axios
      .post(url, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setResult(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const request = axios.CancelToken.source(); // (*)

    const fetchPost = async () => {
      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Token ${token}`,
          },
          cancelToken: request.token, // (*)
        });
        setResult(response.data);
      } catch (err) {
        console.log("There was a problem or request was cancelled.");
      }
    };
    fetchPost();

    return () => request.cancel(); // (*)
  }, []);

  console.log(result); // move the console.log outside of the then block to get updated value after rendering

  // Current Response Format
  // {[{
  // 'resID': INT,
  // 'name': STRING,
  // 'address': STRING,
  // 'contact_no': STRING,
  // 'img': STRING,
  // 'average_rating': FLOAT,
  // 'price': INT,
  // 'location': {
  //     'lat': FLOAT,
  //     'lng': FLOAT
  //     }
  // },

  // resID
  const [resID1, setResID1] = useState(-1);
  const [resID2, setResID2] = useState(-1);
  const [resID3, setResID3] = useState(-1);

  useEffect(() => {
    if (result && result && result.length > 2) {
      setResID1(result[0].resID);
      setResID2(result[1].resID);
      setResID3(result[2].resID);
    }
  }, [result]);

  // Name
  const [name1, setName1] = useState("Loading Name...");
  const [name2, setName2] = useState("Loading Name...");
  const [name3, setName3] = useState("Loading Name...");

  useEffect(() => {
    if (result && result && result.length >= 3) {
      setName1(result[0].name);
      setName2(result[1].name);
      setName3(result[2].name);
    }
  }, [result]);

  // Address
  const [address1, setAddress1] = useState("Loading Address...");
  const [address2, setAddress2] = useState("Loading Address...");
  const [address3, setAddress3] = useState("Loading Address...");

  useEffect(() => {
    if (result && result && result.length > 2) {
      setAddress1(result[0].address);
      setAddress2(result[1].address);
      setAddress3(result[2].address);
    }
  }, [result]);

  // Contact_no
  const [contact1, setContact1] = useState("Loading Contact...");
  const [contact2, setContact2] = useState("Loading Contact...");
  const [contact3, setContact3] = useState("Loading Contact...");

  useEffect(() => {
    if (result && result && result.length > 2) {
      setContact1(result[0].contact_no);
      setContact2(result[1].contact_no);
      setContact3(result[2].contact_no);
    }
  }, [result]);

  // Image
  const [img1, setImg1] = useState("https://i.imgur.com/3ZQ3Z9C.png");
  const [img2, setImg2] = useState("https://i.imgur.com/3ZQ3Z9C.png");
  const [img3, setImg3] = useState("https://i.imgur.com/3ZQ3Z9C.png");

  useEffect(() => {
    if (result && result && result.length > 2) {
      resID1
        ? setImg1("http://localhost:8000" + result[0].img)
        : setImg1(
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              result[0].img +
              "&key=" +
              GOOGLEMAP_API_KEY
          );
      resID2
        ? setImg2("http://localhost:8000" + result[1].img)
        : setImg2(
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              result[1].img +
              "&key=" +
              GOOGLEMAP_API_KEY
          );
      resID3
        ? setImg3("http://localhost:8000" + result[2].img)
        : setImg3(
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              result[2].img +
              "&key=" +
              GOOGLEMAP_API_KEY
          );
    }
  }, [result, resID1, resID2, resID3, GOOGLEMAP_API_KEY]);
  console.log(img1);

  // Average Rating
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);

  useEffect(() => {
    if (result && result && result.length > 2) {
      setRating1(result[0].avg_rating);
      setRating2(result[1].avg_rating);
      setRating3(result[2].avg_rating);
    }
  }, [result]);

  // Price
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [price3, setPrice3] = useState(0);

  useEffect(() => {
    if (result && result && result.length > 2) {
      setPrice1(result[0].price);
      setPrice2(result[1].price);
      setPrice3(result[2].price);
    }
  }, [result]);

  // Location
  const [loc1, setLoc1] = useState({ lat: 1.4459423, lng: 103.7736212 });
  const [loc2, setLoc2] = useState({ lat: 1.4459423, lng: 103.7736212 });
  const [loc3, setLoc3] = useState({ lat: 1.4459423, lng: 103.7736212 });

  useEffect(() => {
    if (result && result && result.length > 2) {
      setLoc1(result[0].location);
      setLoc2(result[1].location);
      setLoc3(result[2].location);
    }
  }, [result]);

  // Distance
  const [dist1, setDist1] = useState(0);
  const [dist2, setDist2] = useState(0);
  const [dist3, setDist3] = useState(0);

  useEffect(() => {
    const origins = `origins=${loc1.lat},${loc1.lng}&`;
    const destinations = `destinations=${state.location}&`;
    const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
    axios
      .get(map_url)
      .then((res) => {
        if (res.data && res.data.rows[0].elements[0].distance) {
          setDist1(res.data.rows[0].elements[0].distance.text);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loc1.lat, loc1.lng, state.location]);

  useEffect(() => {
    const origins = `origins=${loc2.lat},${loc2.lng}&`;
    const destinations = `destinations=${state.location}&`;
    const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
    axios
      .get(map_url)
      .then((res) => {
        if (res.data && res.data.rows[0].elements[0].distance) {
          setDist2(res.data.rows[0].elements[0].distance.text);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loc2.lat, loc2.lng, state.location]);

  useEffect(() => {
    const origins = `origins=${loc3.lat},${loc3.lng}&`;
    const destinations = `destinations=${state.location}&`;
    const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
    axios
      .get(map_url)
      .then((res) => {
        if (res.data && res.data.rows[0].elements[0].distance) {
          setDist3(res.data.rows[0].elements[0].distance.text);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loc3.lat, loc3.lng, state.location]);

  // Selected Content
  const [selected, setSelected] = useState(0);
  const [selectedresID, setSelectedresID] = useState(-1);
  const [selectedAddress, setSelectedAddress] = useState(
    "123 Yummo Rd, Singapore 123456"
  );
  const [selectedContact, setSelectedContact] = useState("9000 0000");
  const [selectedName, setSelectedName] = useState("Loading Name...");
  const [selectedLat, setSelectedLat] = useState(0);
  const [selectedLng, setSelectedLng] = useState(0);
  const [selectedRating, setSelectedRating] = useState(2);
  const [selectedPrice, setSelectedPrice] = useState(2);
  const [selectedDist, setSelectedDist] = useState(0);

  const handleRectClick = (index) => {
    setSelected(index);
  };

  useEffect(() => {
    switch (selected) {
      case 0:
        setSelectedLat(loc1.lat);
        setSelectedLng(loc1.lng);
        setSelectedPrice(price1);
        setSelectedRating(rating1);
        setSelectedDist(dist1);
        setSelectedName(name1);
        setSelectedresID(resID1);
        setSelectedAddress(address1);
        setSelectedContact(contact1);
        break;

      case 1:
        setSelectedLat(loc2.lat);
        setSelectedLng(loc2.lng);
        setSelectedPrice(price2);
        setSelectedRating(rating2);
        setSelectedDist(dist2);
        setSelectedName(name2);
        setSelectedresID(resID2);
        setSelectedAddress(address2);
        setSelectedContact(contact2);
        break;

      case 2:
        setSelectedLat(loc3.lat);
        setSelectedLng(loc3.lng);
        setSelectedPrice(price3);
        setSelectedRating(rating3);
        setSelectedDist(dist3);
        setSelectedName(name3);
        setSelectedresID(resID3);
        setSelectedAddress(address3);
        setSelectedContact(contact3);
        break;

      default:
        break;
    }
  }, [selected]);

  // Data to be passed to next page

  const FinalData = {
    selectedLat: selectedLat,
    selectedLng: selectedLng,
    selectedRating: selectedRating,
    selectedPrice: selectedPrice,
    selectedDist: selectedDist,
    selectedName: selectedName,
    selectedresID: selectedresID,
    selectedAddress: selectedAddress,
    selectedContact: selectedContact,
  };
  console.log(FinalData);

  return (
    <div className="final-container">
      <div className="suggestions-container">
        <div className="suggestions-title-filter">
          <div className="suggestions-texts">
            <h2>Nearby restaurants</h2>
          </div>
          <div className="suggestions-filter">
            <FilterDropdown
              handlePriceFiltered={handlePriceFiltered}
              handleDistanceFiltered={handleDistanceFiltered}
              handleRatingFiltered={handleRatingFiltered}
            />
          </div>
          <div className="update-button">
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                fontSize: "1rem",
                padding: "12px 24px",
                backgroundColor: "#000000",
                color: "#FFD600",
                borderRadius: "2rem",
                fontFamily: "Roboto",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
              onClick={handleUpdateClick}
            >
              Update
            </button>
          </div>
        </div>
        <div className="rectangle-container">
          <div
            className={`rectangle ${
              selected === 0 ? "selected" : "unselected"
            }`}
            onClick={() => handleRectClick(0)}
          >
            <div className="rectangle-icon-container">
              <img className="rest-img" src={img1} alt="restaurant" />
            </div>
            <div className="rectangle-text-container">
              <div className="rectangle-text-title">
                <p>{name1}</p>
              </div>
              <div className="rectangle-text-desc"></div>
            </div>
          </div>
          <div
            className={`rectangle ${
              selected === 1 ? "selected" : "unselected"
            }`}
            onClick={() => handleRectClick(1)}
          >
            <div className="rectangle-icon-container">
              <img className="rest-img" src={img2} alt="restaurant" />
            </div>
            <div className="rectangle-text-container">
              <div className="rectangle-text-title">
                <p>{name2}</p>
              </div>
              <div className="rectangle-text-desc"></div>
            </div>
          </div>
          <div
            className={`rectangle ${
              selected === 2 ? "selected" : "unselected"
            }`}
            onClick={() => handleRectClick(2)}
          >
            <div className="rectangle-icon-container">
              <img className="rest-img" src={img3} alt="restaurant" />
            </div>
            <div className="rectangle-text-container">
              <div className="rectangle-text-title">
                <p>{name3}</p>
              </div>
              <div className="rectangle-text-desc"></div>
            </div>
          </div>
        </div>
        <div className="suggestions-button">
          <Link to="/yummoreservation" state={FinalData}>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                fontSize: "1rem",
                padding: "12px 24px",
                backgroundColor: "#000000",
                color: "#FFD600",
                borderRadius: "2rem",
                fontFamily: "Roboto",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.2rem",
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
      <div className="map-container">
        <div className="map-api">
          <MapContainer latitude={selectedLat} longitude={selectedLng} />
        </div>
        <div className="map-texts">
          <Typography component="legend">Rating:</Typography>
          <Rating
            name="read-only"
            precision={0.5}
            value={selectedRating}
            readOnly
          />
          <Typography component="legend">Price Range:</Typography>
          <Rating
            name="read-only"
            value={selectedPrice}
            readOnly
            precision={0.5}
            icon={<AttachMoneyIcon fontSize="inherit" />}
            emptyIcon={<MoneyOffIcon fontSize="inherit" />}
          />
          <Typography component="legend">Distance: {selectedDist}</Typography>
        </div>
      </div>
    </div>
  );
}