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
import "./yummoreservation.css";

export default function Yummoreservation(props) {
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

    const [selectedLat, setSelectedLat] = useState(0);
    const [selectedLng, setSelectedLng] = useState(0);
    const [selectedRating, setSelectedRating] = useState(2);
    const [selectedPrice, setSelectedPrice] = useState(2);
    const [selectedDist, setSelectedDist] = useState(0);

    useEffect(() => {
        setSelectedLat(state.selectedLat);
        setSelectedLng(state.selectedLng);
        setSelectedRating(state.selectedRating);
        setSelectedPrice(state.selectedPrice);
        setSelectedDist(state.selectedDist);
    }, [state]);

    

    return (
        <>
        <NavBar />
        <div className="final-container">
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
            <div className="pax-time-container">
            </div>
        </div>
        </>
    );
}; 
