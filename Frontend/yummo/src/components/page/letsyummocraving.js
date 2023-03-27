import React, { useState, useEffect } from 'react'
import './letsyummocraving.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLocation, Link } from "react-router-dom";

const cuisines = [
    "Afghan",
    "African",
    "Albanian",
    "Algerian",
    "Alsatian",
    "American",
    "Armenian",
    "Argentine",
    "Asian",
    "Australian",
    "Austrian",
    "Auvergne",
    "Bagels",
    "Bakery",
    "Bangladeshi",
    "Barbecue",
    "Belgian",
    "Bistro",
    "Brazilian",
    "British",
    "Burgers",
    "Burgundy",
    "Burmese",
    "Cafe",
    "Cajun",
    "Californian",
    "Calzones",
    "Cambodian",
    "Caribbean",
    "Cheesesteaks",
    "Chicken",
    "Chilean",
    "Chinese",
    "Chowder",
    "Coffee",
    "Colombian",
    "Contemporary",
    "Continental",
    "Corsica",
    "Creole",
    "Crepes",
    "Cuban",
    "Czech",
    "Deli",
    "Dim Sum",
    "Diner",
    "Dominican",
    "Donuts",
    "Dutch",
    "Eastern European",
    "Eclectic",
    "Egyptian",
    "English",
    "Ethiopian",
    "Ecuadorean",
    "European",
    "Fast Food",
    "Filipino",
    "Fish and Chips",
    "Fondue",
    "French",
    "Frozen Yogurt",
    "Fusion",
    "Gastropub",
    "German",
    "Greek",
    "Grill",
    "Gyros",
    "Haitian",
    "Halal",
    "Hawaiian",
    "Healthy",
    "Hot Dogs",
    "Ice Cream",
    "Indian",
    "Indonesian",
    "International",
    "Irish",
    "Israeli",
    "Italian",
    "Jamaican",
    "Japanese",
    "Juices",
    "Korean",
    "Korean Barbeque",
    "Kosher",
    "Latin",
    "Latin American",
    "Lebanese",
    "Lyonnais",
    "Malaysian",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Mongolian",
    "Moroccan",
    "Nepalese",
    "Noodle Bar",
    "Norwegian",
    "Organic",
    "Oysters",
    "Pacific Rim",
    "Pakistani",
    "Pan Asian",
    "Pasta",
    "Pastries",
    "Persian",
    "Peruvian",
    "Pho",
    "Pizza",
    "Polish",
    "Polynesian",
    "Portuguese",
    "Provençal",
    "Pub Food",
    "Puerto Rican",
    "Raw",
    "Ribs",
    "Russian",
    "Salad",
    "Salvadoran",
    "Sandwiches",
    "Savoy",
    "Scandinavian",
    "Seafood",
    "Senegalese",
    "Singaporean",
    "Smoothies",
    "Soul Food",
    "Soup",
    "South American",
    "South African",
    "South Pacific",
    "Southern",
    "Southwestern",
    "Spanish",
    "Steak",
    "Steakhouse",
    "Subs",
    "Sushi",
    "Taiwanese",
    "Tapas",
    "Tea",
    "Tex Mex",
    "Thai",
    "Tibetan",
    "Traditional",
    "Tunisian",
    "Turkish",
    "Ukrainian",
    "Vegan",
    "Vegetarian",
    "Venezuelan",
    "Vietnamese",
    "Wings",
    "Wraps"
  ]

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

