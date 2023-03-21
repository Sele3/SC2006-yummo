import { useLocation, Link } from "react-router-dom";
import { React, useState, useEffect, forwardRef } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import NavBar from "../navbar.js";
import MapContainer from "../map.js";
import "./yummoreservation.css";
import "react-datepicker/dist/react-datepicker.css";

const NumPax = (props) => {
    const [paxChild, setPaxChild] = useState(0);

    const handlePaxChange = (event, newValue) => {
        setPaxChild(newValue);
        props.handlePax(newValue);
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
                    }
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
            >
            Next
            </button>
        </div>
    </div>
    </>
    );
  };
  
const TimeSelection = () => {
    const [startDate, setStartDate] = useState(new Date());
    /*const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));*/
    const [time, setTime] = useState("12:00");
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
            <div className="date-container">
                <div className="date-title">
                    <h1>Date:</h1>
                </div>
                <div className="date-content">
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    />
                </div>
            </div>
            <div className="time-container">
                <div className="time-title">
                    <h1>Time:</h1>
                </div>
                <div className="time-content">
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={timing}
                    sx={{ width: '10rem' }}
                    onInputChange={(event, newTime) => {
                        setTime(newTime);
                    }}
                    renderInput={(params) => <TextField {...params} label="" />}
                    />
                </div>
            </div>
        </div>
        <div className="confirm-button-container">
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

    useEffect(() => {
        setSelectedLat(state.selectedLat);
        setSelectedLng(state.selectedLng);
        setSelectedRating(state.selectedRating);
        setSelectedPrice(state.selectedPrice);
        setSelectedDist(state.selectedDist);
        setSelectedName(state.selectedName);
    }, [state]);

    const [pax, setPax] = useState(0);
    function handlePax(value) {
        setPax(value);
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
                {/*<NumPax numPax={pax} handlePax={handlePax}/>*/}
                <TimeSelection />
            </div>
        </div>
        </>
    );
}; 
