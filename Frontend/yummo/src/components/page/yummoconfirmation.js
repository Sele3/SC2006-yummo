import { useLocation, Link } from "react-router-dom";
import { React, useState, useEffect, forwardRef } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavBar from "../navbar.js";
import MapContainer from "../map.js";
import "./yummoreservation.css";
import "react-datepicker/dist/react-datepicker.css";


export default function Yummoreservation() {
    const location = useLocation();
    const state = location.state;

    const [confirmedName, setconfirmedName] = useState("Keanu Reeves");
    const [confirmedDate, setconfirmedDate] = useState(new Date());
    const [confirmedTime, setconfirmedTime] = useState("12:00");
    const [confirmedPax, setconfirmedPax] = useState(0);

    useEffect(() => {
        setconfirmedName(state.name);
        setconfirmedDate(state.date);
        setconfirmedTime(state.time);
        setconfirmedPax(state.pax);
    }, [state]);

    return (
        <>
        <NavBar />
        <div className="final-container">
            <div className="map-container">
                    <div className="map-api2">
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
