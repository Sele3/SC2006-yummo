import { useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { createEvent } from "ics";
import { saveAs } from "file-saver";
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
    const [pax, setPax] = useState(1);
    const [location, setLocation] = useState("123 Yummo Street");
    const [lat, setLat] = useState(1.323);
    const [lng, setLng] = useState(103.823);

    useEffect(() => {
        setName(props.name);
        setDate(props.date);
        setPax(props.pax);
        setLocation(props.location);
        setLat(props.lat);
        setLng(props.lng);
    }, [props.name, props.date, props.pax, props.location, props.lat, props.lng]);

    const event = {
        title: 'Reservation at ' + name,
        description: "Reservation will be cancelled if you are more than 15 minutes late.",
        start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()],
        location: location,
        geo: { lat: lat, lon: lng },
        status: 'CONFIRMED',
      }
    console.log(event)

    const handleSave = () => {
        createEvent(event, (error, value) => {
          const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
          saveAs(blob, "event-schedule.ics");
        });
      };

    return (
        <>
        <div className="yloc-box-container">
            <div className="yloc-box-title">
                <img src="congrats-icon.png" alt="oops" width="70%" className="center-img"/>
                <h1>Your booking has been confirmed!</h1>
            </div>
            <div className="yloc-box-content">
                <p>Restaurant Name: {name}</p>
                <p>Date: {date.toDateString()}</p>
                <p>Time: {date.toLocaleTimeString('en-US')}</p>
                <p>Pax: {pax}</p>
            </div>
            <button style={{
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
                    onClick={handleSave}>
                    Save your schedule
            </button>
        </div>
        </>
        );
    };

export default function Yummoconfirmation() {
    const location = useLocation();
    const state = location.state;

    const [confirmedName, setconfirmedName] = useState("Keanu Reeves");
    const [confirmedDate, setconfirmedDate] = useState(new Date());
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
        setconfirmedName(state.name);
        setconfirmedDate(state.date);
        setconfirmedPax(state.pax);
        setconfirmedAddress(state.address);
        setconfirmedContact(state.contact);
        setconfirmedresID(state.resID);
        setconfirmedLat(state.selectedLat);
        setconfirmedLng(state.selectedLng);
        setconfirmedRating(state.selectedRating);
        setconfirmedPrice(state.selectedPrice);
        setconfirmedDist(state.selectedDist);
    }, [state]);

    console.log({confirmedName, confirmedDate, confirmedPax, confirmedAddress, confirmedContact, confirmedresID, confirmedLat, confirmedLng, confirmedRating, confirmedPrice, confirmedDist});

    return (
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
            { confirmedresID ? 
                <YummoRestaurant name={confirmedName} 
                                date={confirmedDate} 
                                pax={confirmedPax} 
                                location={confirmedAddress}
                                lat={confirmedLat}
                                lng={confirmedLng}
                                resID={confirmedresID}
                />
                :
                <GoogleRestaurant name={confirmedName} address={confirmedAddress} contact={confirmedContact}/>
            }
            </div>
        </div>
    );
}; 