import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import NavBar from "../navbar.js";

const AboutPage = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  const url = 'http://127.0.0.1:8000/api/restaurants/search';
  const token = process.env.REACT_APP_BACKEND_API_KEY;
  const data = 
  {
    "address": state.location,
    "radius": "",
    "keyword": state.craving,
    "rankby": ""
  };
  console.log(data);

  const [result, setResult] = useState({});

  useEffect(() => {
    axios.post(url, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        setResult(res.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  console.log(result); // move the console.log outside of the then block to get updated value after rendering
  console.log(result?.status);

  return (
    <>
    <NavBar />
      <h1>This is About page</h1>
      {state && (
        <div>
          {result?.status !== "OK" && (
            <p>No results found.</p>
          )}
          {result && (
            <div>
              <h3>API Response:</h3>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      <hr />
      <Link to="/">Go Home</Link>
    </>
  );
};

export default AboutPage;