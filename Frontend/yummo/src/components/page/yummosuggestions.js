import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import axios from 'axios';
import NavBar from "../navbar.js";
import MapContainer from "../map.js";
import FilterDropdown from "../filterdropdown.js";
import "./yummosuggestions.css";

export default function Yummosuggestions(props) {
    const location = useLocation();
    const state = location.state;

    const url = 'http://127.0.0.1:8000/api/restaurants/search';
    const token = process.env.REACT_APP_BACKEND_API_KEY;
    const data = 
    {
        "address": state.location,
        "radius": "",
        "keyword": state.craving,
        "rankby": ""
    };

    const [result, setResult] = useState({});

    useEffect(() => {
        axios.post(url, data, {
        headers: {
            'Authorization': `Token ${token}`,
        },
        })
        .then(res => {
            if (res.data) {
                setResult(res.data);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, []);


    const [loc1, setLoc1] = useState({ lat: 1.4459423, lng: 103.7736212 });
    const [loc2, setLoc2] = useState({ lat: 1.4459423, lng: 103.7736212 });
    const [loc3, setLoc3] = useState({ lat: 1.4459423, lng: 103.7736212 });
    
    useEffect(() => {
        if (result && result.results && result.results.length > 2) {
          setLoc1(result.results[0].geometry.location);
          setLoc2(result.results[1].geometry.location);
          setLoc3(result.results[2].geometry.location);
        }
    }, [result]);

    const [name1, setName1] = useState("Loading Name...");
    const [name2, setName2] = useState("Loading Name...");
    const [name3, setName3] = useState("Loading Name...");
    
    useEffect(() => {
        if (result && result.results && result.results.length >= 3) {
          setName1(result.results[0].name);
          setName2(result.results[1].name);
          setName3(result.results[2].name);
        }
    }, [result]);

    const [dist1, setDist1] = useState(0);
    const [dist2, setDist2] = useState(0);
    const [dist3, setDist3] = useState(0);

    useEffect(() => {
        const origins = `origins=${loc1.lat},${loc1.lng}&`;
        const destinations = `destinations=${state.location}&`;
        const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
        axios.get(map_url)
        .then(res => {
            if (res.data && res.data.rows[0].elements[0].distance) {
                setDist1(res.data.rows[0].elements[0].distance.text);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, [loc1.lat, loc1.lng]);

    useEffect(() => {
        const origins = `origins=${loc2.lat},${loc2.lng}&`;
        const destinations = `destinations=${state.location}&`;
        const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
        axios.get(map_url)
        .then(res => {
            if (res.data && res.data.rows[0].elements[0].distance) {
                setDist2(res.data.rows[0].elements[0].distance.text);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, [loc2.lat, loc2.lng]);

    useEffect(() => {
        const origins = `origins=${loc3.lat},${loc3.lng}&`;
        const destinations = `destinations=${state.location}&`;
        const map_url = `https://api.distancematrix.ai/maps/api/distancematrix/json?${origins}${destinations}key=G1KGgPTnJDvFllJVuRE0bGax5QIYB`;
        axios.get(map_url)
        .then(res => {
            if (res.data && res.data.rows[0].elements[0].distance) {
                setDist3(res.data.rows[0].elements[0].distance.text);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }, [loc3.lat, loc3.lng]);

    const [selected, setSelected] = useState(0);
    const [selectedLat, setSelectedLat] = useState(0);
    const [selectedLng, setSelectedLng] = useState(0);
    const [selectedRating, setSelectedRating] = useState(2);
    const [selectedPrice, setSelectedPrice] = useState(2);
    const [selectedDist, setSelectedDist] = useState(0);

    const handleRectClick = (index) => {
        setSelected(index);
    }

    useEffect(() => {
        switch (selected) {
            case 0:
                setSelectedLat(loc1.lat);
                setSelectedLng(loc1.lng);
                if(result && result.results && result.results.length > 0){
                    setSelectedPrice(result.results[0].price_level);}
                if(result && result.results && result.results.length > 0){
                    setSelectedRating(result.results[0].rating);}
                setSelectedDist(dist1);
                break;
        
            case 1:
                setSelectedLat(loc2.lat);
                setSelectedLng(loc2.lng);
                if(result && result.results && result.results.length > 1){
                    setSelectedPrice(result.results[1].price_level);}
                if(result && result.results && result.results.length > 1){
                    setSelectedRating(result.results[1].rating);}
                setSelectedDist(dist2);
                break;

            case 2:
                setSelectedLat(loc3.lat);
                setSelectedLng(loc3.lng);
                if(result && result.results && result.results.length > 2){
                    setSelectedPrice(result.results[2].price_level);}
                if(result && result.results && result.results.length > 2){
                    setSelectedRating(result.results[2].rating);}
                setSelectedDist(dist3);
                break;

            default:
                break;
        }
    }, [selected]);

    return (
        <>
        <NavBar />
        <div className="final-container">
            <div className="suggestions-container">
                <div className="suggestions-title-filter">
                    <div className="suggestions-texts">
                        <h2>Nearby restaurants</h2>
                    </div>
                    <div className="suggestions-filter">
                        <FilterDropdown />
                    </div>
                </div>
                <div className="rectangle-container">
                    <div 
                      className={`rectangle ${selected === 0 ? 'selected' : 'unselected'}`}
                      onClick={() => handleRectClick(0)}>
                        <div className="rectangle-icon-container">
                        </div>
                        <div className="rectangle-text-container">
                            <div className="rectangle-text-title">
                                <p>{name1}</p>
                            </div>
                            <div className="rectangle-text-desc">
                            </div>
                        </div>
                    </div>
                    <div 
                      className={`rectangle ${selected === 1 ? 'selected' : 'unselected'}`}
                      onClick={() => handleRectClick(1)}>
                        <div className="rectangle-icon-container">
                        </div>
                        <div className="rectangle-text-container">
                            <div className="rectangle-text-title">
                                <p>{name2}</p>
                            </div>
                            <div className="rectangle-text-desc">
                            </div>
                        </div>
                    </div>
                    <div 
                      className={`rectangle ${selected === 2 ? 'selected' : 'unselected'}`}
                      onClick={() => handleRectClick(2)}>
                        <div className="rectangle-icon-container">
                        </div>
                        <div className="rectangle-text-container">
                            <div className="rectangle-text-title">
                                <p>{name3}</p>
                            </div>
                            <div className="rectangle-text-desc">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="suggestions-button">
                    <Link to="" state={""}>
                        <button 
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                fontSize: '1rem',
                                padding: '12px 24px',
                                backgroundColor: '#000000',
                                color: '#FFD600',
                                borderRadius: '2rem',
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2rem',
                                border: 'none',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                                cursor: 'pointer'
                            }}
                            >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
            <div className="map-container">
                    <div className="map-api">
                    <MapContainer latitude={selectedLat} longitude={selectedLng}/>
                    </div>
                    <div className="map-texts">
                        <Typography component="legend">Rating:</Typography>
                        <Rating 
                            name="read-only" 
                            precision={0.5}
                            value={selectedRating} 
                            readOnly />
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
        </>
    );
}; 
