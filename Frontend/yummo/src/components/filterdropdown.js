import {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Slider, Typography, Select, MenuItem, Box } from '@mui/material';

const useStyles = makeStyles({
    root: {
      width: "5rem",
      marginLeft: "2rem",
    },
    dropdown: {
      minWidth: "5rem",
      minHeight: "5rem",
    },
});

const marksPrice = [
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
  },
  {
    value: 4,
    label: "$$$$",
  },
  {
    value: 5,
    label: "$$$$$",
  },
];

function valuePrice(value) {
    return `{value}`;
  }

const marksDistance = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

function valueDistance(value) {
    return `{value}`;
  }

const marksRating = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

function valueRating(value) {
    return `{value}`;
  }

export default function FilterDropdown(props) {
  const classes = useStyles();

  const [priceFilter, setPriceFilter] = useState(2);
  const [distanceFilter, setDistanceFilter] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(5);

  const handlePriceChange = (event, newValue) => {
      setPriceFilter(newValue);
      props.handlePriceFiltered(newValue);
    };
  
  const handleDistanceChange = (event, newValue) => {
      setDistanceFilter(newValue);
      props.handleDistanceFiltered(newValue);

    };
  
  const handleRatingChange = (event, newValue) => {
      setRatingFilter(newValue);
      props.handleRatingFiltered(newValue);
    };

  return (
    <div className={classes.root}>
        <Select
            value=""
            displayEmpty
            className={classes.dropdown}
            // add the following lines
            MenuProps={{
            PaperProps: {
                style: {
                height: "auto",
                minWidth: "35rem",
                },
            },
            }}
        >
        <MenuItem value="" disabled>
          Filter by
        </MenuItem>
        <MenuItem value="price">
            <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1" paddingRight={20}>Price Range</Typography>
                <Slider
                    onChange={handlePriceChange}
                    getAriaValueText={valuePrice}
                    marks={marksPrice}
                    size="medium"
                    sx={{ width: 200 }}
                    step={1}
                    aria-label="price-filter"
                    defaultValue={2}
                    value={priceFilter}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </Box>
        </MenuItem>
        <MenuItem value="distance">
            <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1" paddingRight={10}>Distance Range (in km)</Typography>
                <Slider
                    onChange={handleDistanceChange}
                    getAriaValueText={valueDistance}
                    marks={marksDistance}
                    size="medium"
                    sx={{ width: 200 }}
                    step={1}
                    aria-label="dist-filter"
                    defaultValue={0.1}
                    value={distanceFilter}
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                />
            </Box>
        </MenuItem>
        <MenuItem value="rating">
            <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1" paddingRight={18}>Rating Range</Typography>
                <Slider
                    onChange={handleRatingChange}
                    getAriaValueText={valueRating}
                    marks={marksRating}
                    size="medium"
                    sx={{ width: 200 }}
                    step={1}
                    aria-label="rating-filter"
                    defaultValue={5}
                    value={ratingFilter}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </Box>
        </MenuItem>
      </Select>
    </div>
  );
}
