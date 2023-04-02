import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { Link } from 'react-router-dom';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLEMAP_API_KEY;
console.log(GOOGLE_MAPS_API_KEY);
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function GoogleMaps(props) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);


  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
    <div>
    <Autocomplete
    sx={{ display: 'flex', width: '35rem', justifyContent: 'center', alignItems: 'center', position: 'relative', borderRadius: '1rem' }}
    getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
    }
    filterOptions={(x) => x}
    options={options}
    autoComplete
    includeInputInList
    filterSelectedOptions
    value={value}
    noOptionsText="No locations"
    onKeyDown={(event) => {
        if (event.key === 'Enter') {
        // Prevent's default 'Enter' behavior.
        event.defaultMuiPrevented = false;
        // your handler code
        }
    }}
    onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
    }}
    onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
    }}
    renderInput={(params) => (
        <TextField {...params} label="" fullWidth />
    )}
    renderOption={(props, option) => {
        const matches =
        option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
        option.structured_formatting.main_text,
        matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
        <li {...props}>
            <Grid container alignItems="center">
            <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
            </Grid>
            <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
            >
                {parts.map((part, index) => (
                <Box
                    key={index}
                    component="span"
                    sx={{
                    fontWeight: '800',
                    fontFamily: 'Nunito',
                    }}
                >
                    {part.text}
                </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                {option.structured_formatting.secondary_text}
                </Typography>
            </Grid>
            </Grid>
        </li>
        );
    }}
    />
    </div>
    <br />
    <Link to="/letsyummocraving" state={inputValue}>
    <button 
    style={{
        display: 'flex',
        marginTop: '10rem',
        marginLeft: '-21em',
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
    </>
  );
}