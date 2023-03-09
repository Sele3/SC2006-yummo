import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const AboutPage = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  const url = 'http://127.0.0.1:8000/api/restaurants/recommendations';
  const token = '1b4a3a59041c56c203a4f44e77f831bd705c029f';
  const data = {"address": state};

  const postData = {"address" : "NTU"} //payload data must be in json

  const [result, setResult] = useState({});

  useEffect(() => {
    axios.post(url, data, {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded', //change to json
          'Authorization': `Token ${token}`,
      },
    })
      .then(res => {
          setResult(res.data);
          console.log(result);
      })
      .catch(err => {
          console.error(err);
      });
  }, [data, url, token]);

  return (
    <>
      <h1>This is About page</h1>
      {state && (
        <div>
          <h3>Passed data:</h3>
          <p>InputLocation: {state}</p>
          <h3>API Data:</h3>
          {result?.status === "OK" && (
            <div>
              <p>Business Name: {result.results[0].name}</p>
              <p>Location: {result.results[0].vicinity}</p>
              <p>Latitude: {result.results[0].geometry.location.lat}</p>
              <p>Longitude: {result.results[0].geometry.location.lng}</p>
              <p>Rating: {result.results[0].rating}</p>
            </div>
          )}
          {result?.status !== "OK" && (
            <p>No results found.</p>
          )}
        </div>
      )}
      <hr />
      <Link to="/">Go Home</Link>
    </>
  );
};

export default AboutPage;
