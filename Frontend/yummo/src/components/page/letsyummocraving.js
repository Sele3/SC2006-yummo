import React from 'react'
import './letsyummocraving.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation, Link } from "react-router-dom";

const cuisines = [
  "Asian",
  "Bakery", "Barbecue", "Bistro", "Brazilian", "British", "Burgers",
  "Cafe", "Cajun", "Chinese", "Coffee", "Contemporary", "Continental", "Creole",
  "Deli", "Dim Sum", "Diner",
  "Eastern European",
  "Fast Food", "Filipino", "Fish and Chips", "French",
  "German", "Greek", "Grill",
  "Halal",
  "Indian", "Indonesian", "International", "Italian",
  "Japanese",
  "Korean",
  "Malaysian", "Mediterranean", "Mexican", "Middle Eastern",
  "Noodle Bar",
  "Pizza", "Portuguese",
  "Pub Food",
  "Seafood", "Singaporean", "Spanish", "Steak",
  "Steakhouse", "Sushi",
  "Taiwanese", "Tapas", "Tex Mex",
  "Thai", "Turkish",
  "Vegetarian", "Vietnamese",
];

export default function Letsyummocraving () {
	const location = useLocation();
	const passed_location = location.state;
	const [inputCraving, setCravingValue] = React.useState('');
	const finaldata = {
		location: passed_location,
		craving: inputCraving
	}


	return (
		<>
		<div className='texts'>
			<section>
				<span className='front'>Yum</span>
				<span className='back'>mo</span>
				<span className='WAYC'>What are you craving?</span>		
			</section>
		</div>
		<div className="location-container-c">
			<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={cuisines}
			sx={{ width: '30rem' }}
			onInputChange={(event, newCravingValue) => {
				setCravingValue(newCravingValue);
			}}
			renderInput={(params) => <TextField {...params} label="" />}
			/>
		</div>
		<Link to="/yummosuggestions" state={finaldata}>
			<div className="next-button">
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
		</Link>
		</>
  );
}

