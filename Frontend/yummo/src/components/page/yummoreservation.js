import { useLocation, Link } from "react-router-dom";
import { React, useState, useEffect, forwardRef } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DatePicker from "react-datepicker";
import NavBar from "../navbar.js";
import MapContainer from "../map.js";
import "./yummoreservation.css";
import "react-datepicker/dist/react-datepicker.css";

const NumPax = (props) => {
    const [paxChild, setPaxChild] = useState(0);

    const handlePaxChange = (event) => {
        setPaxChild(event.target.value);
        props.handlePax(event.target.value);
        console.log('paxChild: ' + event.target.value);
    };

    return (
    <>
    <div className="input-box-container">
        <div className="input-box-title">
            <h1>How many pax?</h1>
        </div>
        <div className="input-box-content">
            <Box component="form" noValidate autoComplete="off">
            <TextField
                type="number"
                id="outlined-basic"
                label=""
                variant="outlined"
                value={paxChild}
                onChange={handlePaxChange}
                InputProps={{
                    sx: {
                        "& input": {
                            textAlign: "center"
                        }
                    },
                    inputProps: { min: 0 }
                }}
            />
            </Box>
        </div>
        <div className="next-button-container">
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
                    onClick={() => props.handleNext(1)}
                >
                Next
                </button>
        </div>
    </div>
    </>
    );
  };
  
const TimeSelection = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));
    const [time, setTime] = useState("12:00");

    useEffect(() => {
        props.handleTime(time);
        props.handleDate(startDate);
    }, [time, startDate]);

    const DataPassing = {
        'time': props.time,
        'date': props.date,
        'pax': props.pax,
        'name': props.selectedName,
        'resID': props.selectedresID,
        'address': props.selectedAddress,
        'contact': props.selectedContact,
        'selectedLng': props.selectedLng,
        'selectedLat': props.selectedLat,
        'selectedRating': props.selectedRating,
        'selectedPrice': props.selectedPrice,
        'selectedDist': props.selectedDist,
    }
    console.log(DataPassing);

    const timing = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
    ];

    return (
        <>
        <div className="date-selection-container">
            <h1>Confirm your selection</h1>
            <div className="date-container">
                <div className="date-title">
                    <h2>Date:</h2>
                </div>
                <div className="date-content">
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                    />
                </div>
            </div>
            <div className="time-container">
                <div className="time-title">
                    <h2>Time:</h2>
                </div>
                <div className="time-content">
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={timing}
                    sx={{ width: '10rem', backgroundColor: '#FFD600', fontWeight: 'bold' }}
                    onInputChange={(event, newTime) => {
                        setTime(newTime);
                    }}
                    renderInput={(params) => <TextField {...params} label="" />}
                    />
                </div>
            </div>
            <div className="confirm-button-container">
                <Link to="/yummoconfirmation" state={DataPassing}>
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
                    Confirm
                    </button>
                </Link>
            </div>
        </div>
        </>
    );
  };

export default function Yummoreservation(props) {
    const location = useLocation();
    const state = location.state;

    const [selectedName, setSelectedName] = useState("");
    const [selectedLat, setSelectedLat] = useState(0);
    const [selectedLng, setSelectedLng] = useState(0);
    const [selectedRating, setSelectedRating] = useState(2);
    const [selectedPrice, setSelectedPrice] = useState(2);
    const [selectedDist, setSelectedDist] = useState(0);
    const [selectedresID, setSelectedresID] = useState(-1);
    const [selectedContact, setSelectedContact] = useState("9000 0000");
    const [selectedAddress, setSelectedAddress] = useState("1 Yummo Road, Singapore 123456");

    useEffect(() => {
        setSelectedLat(state.selectedLat);
        setSelectedLng(state.selectedLng);
        setSelectedRating(state.selectedRating);
        setSelectedPrice(state.selectedPrice);
        setSelectedDist(state.selectedDist);
        setSelectedName(state.selectedName);
        setSelectedresID(state.selectedresID);
        setSelectedContact(state.selectedContact);
        setSelectedAddress(state.selectedAddress);
    }, [state]);

    const [nextClicked, setNextClicked] = useState(false);

    const [pax, setPax] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    function handlePax(value) {
        setPax(value);
        console.log("new pax: ", value);
    }
    function handleDate(value) {
        setDate(value);
        console.log("new date: ", value);
    }
    function handleTime(value) {
        setTime(value);
        console.log("new time: ", value);
    }
    function handleNext() {
        setNextClicked(true);
        console.log("next clicked");
    }

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
                <TransitionGroup>
                    <CSSTransition
                        in={nextClicked}
                        classNames="slide"
                        timeout={800}
                        unmountOnExit
                    >
                        {nextClicked ?
                        <TimeSelection handleDate={handleDate} 
                                    handleTime={handleTime} 
                                    pax={pax} 
                                    date={date} 
                                    time={time} 
                                    selectedName={selectedName} 
                                    selectedresID={selectedresID} 
                                    selectedAddress={selectedAddress} 
                                    selectedContact={selectedContact}
                                    selectedLat={selectedLat}
                                    selectedLng={selectedLng}
                                    selectedRating={selectedRating}
                                    selectedPrice={selectedPrice}
                                    selectedDist={selectedDist}
                        /> 
                        : 
                        <NumPax numPax={pax} 
                                handlePax={handlePax} 
                                handleNext={handleNext}/>}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
        </>
    );
}; 
