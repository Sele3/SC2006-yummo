import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./merchantAddRestaurant.css";
import MerchantGoogle from "./merchantGoogle.js";
// import CuisineSelection from "./cuisinetest.js";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth } from "../../hooks/useAuth";

function MerchantAddRestaurant() {
  const navigate = useNavigate();
  const { token, getProfile } = useAuth();
  const theme = useTheme(); //frm cuisine
  const [username, setUsername] = useState("");
  const [cuisineName, setCuisineName] = useState([]); //frm cuisine
  const [markers, setMarkers] = useState("");
  const [restName, setrestName] = useState("");
  const [resAddress, setresAddress] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [priceRange, setprice] = useState("");
  // const [selectedImg, setSelectedImg] = useState(null);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const filePath = `${image.name}`;

  const state = {
    restName: "",
    resAddress: "",
    contactNo: "",
    img: null,
    cuisine: "",
    priceRange: "",
  };

  // must change url!!
  const url = "http://localhost:8000/api/restaurants";
  const data = { address: state };
  const [result, setResult] = useState({});

  useEffect(() => {
    getProfile().then((response) => {
      const { user } = response;
      setUsername(user.username);
    });
  });

  console.log(getProfile());

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", restName);
    formData.append("address", address);
    if (image) {
      formData.append("img", image);
    }
    formData.append("contact_no", contactNo);
    formData.append("cuisines", cuisineName.join(", "));
    formData.append("price", parseInt(priceRange));

    axios
      .post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })

      .then((response) => {
        console.log(response.data);
        navigate("/merchant/successfully-added");
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response);
      });
  };

  //   //useEffect(() => {
  //   console.log(1);
  //   axios.post(url, restaurant);
  //   console.log("Success");
  // }

  // const handlePriceChange = (event) => {
  //   setPriceRange(event.target.value);
  // };
  const handleRestNameChange = (e) => {
    setrestName(e.target.value);
  };
  const handleRestAddChange = (e) => {
    setresAddress(e.target.value);
  };
  const handleContactNoChange = (e) => {
    setcontactNo(e.target.value);
  };
  const handleCuisineChange = (e) => {
    const {
      target: { value },
    } = e;
    setCuisineName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function handleImage(e) {
    console.log(e.target.files);
    if (e.target.files)
      setImage(e.target.files[0]);
  }

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  /*cuisine starts here-----------------------------------------*/
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
    "Peranakan", "Pizza", "Portuguese",
    "Pub Food",
    "Seafood", "Singaporean", "Spanish", "Steak",
    "Steakhouse", "Sushi",
    "Taiwanese", "Tapas", "Tex Mex",
    "Thai", "Turkish",
    "Vegetarian", "Vietnamese",
  ];
  
  function getStyles(selected_cuisine, cuisineName, theme) {
    return {
      fontWeight:
        cuisineName.indexOf(selected_cuisine) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  /*cuisine ends here-----------------------------------------*/

  return (
    <div>
      <div className="res-items-to-be-left">
        <h1>
          Account: <span class="blue-text">{username}</span>
        </h1>
        <h2>Add Restaurant:</h2>
      </div>

      <div className="m-centre-items">
        <div className="google-gugu">
          <MerchantGoogle setAddress={setAddress} />
        </div>
        <div className="register-res">
          <form action="POST">
            <input
              type="text"
              value={restName}
              onChange={(e) => {
                setrestName(e.target.value);
              }}
              placeholder="Restaurant Name"
            />
            <input
              type="text"
              value={contactNo}
              onChange={(e) => {
                setcontactNo(e.target.value);
              }}
              placeholder="Restaurant Contact number"
            />
            <div className="CUISINE_STUFF">
              <FormControl sx={{ width: 500 }}>
                <InputLabel id="demo-multiple-name-label">Cuisine</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={cuisineName}
                  onChange={handleCuisineChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {cuisines.map((selected_cuisine) => (
                    <MenuItem
                      key={selected_cuisine}
                      value={selected_cuisine}
                      style={getStyles(selected_cuisine, cuisineName, theme)}
                    >
                      {selected_cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="image-input-container">
              <div className="image-input ">
                <label htmlFor="restaurant-image">
                  Upload an image of your restaurant:
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleImage(e)}
                />
              </div>
            </div>
            <div className="price-drop-down">
              <select
                id="price-range"
                value={priceRange}
                onChange={handlePriceChange}
                style={{
                  width: "540px",
                  height: "3rem",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  fontSize: "18px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Price Range</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <input type="submit" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
export default MerchantAddRestaurant;

//works