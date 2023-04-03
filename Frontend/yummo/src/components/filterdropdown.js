import {useState} from "react";
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
    value: 12500,
    label: "10000",
  },
  {
    value: 25000,
    label: "21000",
  },
  {
    value: 37500,
    label: "10000",
  },
  {
    value: 50000,
    label: "50000",
  },
];

function valueDistance(value) {
    return `{value}`;
  }

const marksSortby = [
  {
    value: 0,
    label: "YUMMO",
  },
  {
    value: 1,
    label: "DISTANCE",
  },
  {
    value: 2,
    label: "RATING",
  },
];

function valueSortby(value) {
    return `{value}`;
  }

export default function FilterDropdown(props) {
  const classes = useStyles();

  const [priceFilter, setPriceFilter] = useState(3);
  const [distanceFilter, setDistanceFilter] = useState(5000);
  const [SortbyFilter, setSortbyFilter] = useState(0);

  const handlePriceChange = (event, newValue) => {
      setPriceFilter(newValue);
      props.handlePriceFiltered(newValue);
    };
  
  const handleDistanceChange = (event, newValue) => {
      setDistanceFilter(newValue);
      props.handleDistanceFiltered(newValue);

    };
  
  const handleSortbyChange = (event, newValue) => {
      setSortbyFilter(newValue);
      props.handleSortbyFiltered(newValue);
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
                <Typography variant="subtitle1" paddingRight={10}>Distance Range (in m)</Typography>
                <Slider
                    onChange={handleDistanceChange}
                    getAriaValueText={valueDistance}
                    marks={marksDistance}
                    size="medium"
                    sx={{ width: 200 }}
                    step={100}
                    aria-label="dist-filter"
                    defaultValue={1500}
                    value={distanceFilter}
                    min={0}
                    max={50000}
                    valueLabelDisplay="auto"
                />
            </Box>
        </MenuItem>
        <MenuItem value="sortby">
            <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1" paddingRight={18}>Sort By</Typography>
                <Slider
                    onChange={handleSortbyChange}
                    getAriaValueText={valueSortby}
                    marks={marksSortby}
                    size="medium"
                    sx={{ width: 200 }}
                    step={1}
                    aria-label="sortby-filter"
                    defaultValue={0}
                    value={SortbyFilter}
                    min={0}
                    max={2}
                    valueLabelDisplay="auto"
                />
            </Box>
        </MenuItem>
      </Select>
    </div>
  );
}
