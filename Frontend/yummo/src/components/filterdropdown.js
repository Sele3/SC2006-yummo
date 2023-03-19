import React from "react";
import { makeStyles } from "@mui/styles";
import { Slider, Typography, Select, MenuItem } from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  slider: {
    marginTop: 10,
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

const marksDistance = [
  {
    value: 0.1,
    label: "0.1 km",
  },
  {
    value: 10,
    label: "10 km",
  },
  {
    value: 50,
    label: "50 km",
  },
  {
    value: 100,
    label: "100 km",
  },
];

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

export default function FilterDropdown() {
  const classes = useStyles();
  const [priceRange, setPriceRange] = React.useState([1, 5]);
  const [distanceRange, setDistanceRange] = React.useState([0.1, 100]);
  const [ratingRange, setRatingRange] = React.useState([1, 5]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistanceRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  return (
    <div className={classes.root}>
      <Select value="" displayEmpty>
        <MenuItem value="" disabled>
          Filter by
        </MenuItem>
        <MenuItem value="price">
          <Typography variant="subtitle1">Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            marks={marksPrice}
            step={null}
            className={classes.slider}
            orientation="vertical"
          />
        </MenuItem>
        <MenuItem value="distance">
          <Typography variant="subtitle1">Distance Range (in km)</Typography>
          <Slider
            value={distanceRange}
            onChange={handleDistanceChange}
            valueLabelDisplay="auto"
            marks={marksDistance}
            step={null}
            className={classes.slider}
            orientation="vertical"
          />
        </MenuItem>
        <MenuItem value="rating">
          <Typography variant="subtitle1">Rating Range</Typography>
          <Slider
            value={ratingRange}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            marks={marksRating}
            step={null}
            className={classes.slider}
            orientation="vertical"
          />
        </MenuItem>
      </Select>
    </div>
  );
}
