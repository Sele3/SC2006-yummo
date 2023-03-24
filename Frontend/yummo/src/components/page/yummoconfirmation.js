import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import NavBar from "../navbar.js";
import MapContainer from "../map.js";
import "./yummoconfirmation.css";

const GoogleRestaurant = (props) => {
    const [name, setName] = useState("Yummo Restaurant");
    const [address, setAddress] = useState("123 Yummo Street");
    const [contact, setContact] = useState("9000 0000");

    useEffect(() => {
        setName(props.name);
        setAddress(props.address);
        setContact(props.contact);
    }, [props.name, props.address, props.contact]);

    return (
    <>
    <div className="input-box-container">
        <div className="gloc-box-title">
            <img src="ooops-icon.jpeg" alt="oops" width="70%" className="center-img"/>
            <h2>We currently only accept Yummo Restaurant Booking. Please make your reservation using the info below!</h2>
        </div>
        <div className="gloc-box-content">
            <p>Restaurant Name: {name}</p>
            <p>Address: {address}</p>
            <p>Contact: {contact}</p>
        </div>
    </div>
    </>
    );
  };

const YummoRestaurant = (props) => {
    const [name, setName] = useState("Yummo Restaurant");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("12:00");
    const [pax, setPax] = useState(1);

    useEffect(() => {
        setName(props.name);
        setDate(props.date);
        setTime(props.time);
        setPax(props.pax);
    }, [props.name, props.date, props.time, props.pax]);

    return (
        <>
        <div className="input-box-container">
            <div className="yloc-box-title">
                <img src="congrats-icon.png" alt="oops" width="70%" className="center-img"/>
                <h1>Your booking has been confirmed!</h1>
            </div>
            <div className="yloc-box-content">
                <p>Restaurant Name: {name}</p>
                <p>Date: {date.toDateString()}</p>
                <p>Time: {time}</p>
                <p>Pax: {pax}</p>
            </div>
        </div>
        </>
        );
    };

export default function Yummoreservation() {
    const location = useLocation();
    const state = location.state;

    const [confirmedName, setconfirmedName] = useState("Keanu Reeves");
    const [confirmedDate, setconfirmedDate] = useState(new Date());
    const [confirmedTime, setconfirmedTime] = useState("12:00");
    const [confirmedPax, setconfirmedPax] = useState(0);
    const [confirmedresID, setconfirmedresID] = useState(0);
    const [confirmedAddress, setconfirmedAddress] = useState("123 Yummo Street");
    const [confirmedContact, setconfirmedContact] = useState("9000 0000");
    const [confirmedLat, setconfirmedLat] = useState(0);
    const [confirmedLng, setconfirmedLng] = useState(0);
    const [confirmedRating, setconfirmedRating] = useState(0);
    const [confirmedPrice, setconfirmedPrice] = useState(0);
    const [confirmedDist, setconfirmedDist] = useState(0);

    useEffect(() => {
        setconfirmedName(state.selectedName);
        setconfirmedDate(state.date);
        setconfirmedTime(state.time);
        setconfirmedPax(state.pax);
        setconfirmedAddress(state.selectedAddress);
        setconfirmedContact(state.selectedContact);
        setconfirmedresID(state.selectedresID);
        setconfirmedLat(state.selectedLat);
        setconfirmedLng(state.selectedLng);
        setconfirmedRating(state.selectedRating);
        setconfirmedPrice(state.selectedPrice);
        setconfirmedDist(state.selectedDist);
    }, [state]);

    console.log({confirmedName, confirmedDate, confirmedTime, confirmedPax, confirmedAddress, confirmedContact, confirmedresID, confirmedLat, confirmedLng, confirmedRating, confirmedPrice, confirmedDist});

    return (
        <>
        <NavBar />
        <div className="final-container">
            <div className="map-container">
                    <div className="map-api2">
                    <MapContainer latitude={confirmedLat} longitude={confirmedLng}/>
                    </div>
                    <div className="map-texts">
                        <Typography component="legend">Rating:</Typography>
                        <Rating 
                            name="read-only" 
                            precision={0.5}
                            value={confirmedRating} 
                            readOnly />
                        <Typography component="legend">Price Range:</Typography>
                        <Rating
                            name="read-only"
                            value={confirmedPrice}
                            readOnly
                            precision={0.5}
                            icon={<AttachMoneyIcon fontSize="inherit" />}
                            emptyIcon={<MoneyOffIcon fontSize="inherit" />}
                        />
                        <Typography component="legend">Distance: {confirmedDist}</Typography>
                    </div>
            </div>
            <div className="gloc-time-container">
                {/*<GoogleRestaurant name={confirmedName} address={confirmedAddress} contact={confirmedContact}/>*/}
                <YummoRestaurant name={confirmedName} date={confirmedDate} time={confirmedTime} pax={confirmedPax}/>
            </div>
        </div>
        </>
    );
}; 
