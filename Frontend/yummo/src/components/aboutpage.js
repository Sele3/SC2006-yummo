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

  const [result, setResult] = useState({});

  useEffect(() => {
    axios.post(url, data, {
      headers: {
          'Authorization': `Token ${token}`,
      },
    })
      .then(res => {
          if (res.data) {
              setResult(res.data);
          }
      })
      .catch(err => {
          console.error(err);
      });
  }, []);
  console.log(result); // move the console.log outside of the then block to get updated value after rendering
  console.log(result?.status)


  return (
    <>
      <h1>This is About page</h1>
      {state && (
        <div>
          <h3>Passed data:</h3>
          <p>InputLocation: {state}</p>
          <p>Result Status: {result.status}</p>
          <h3>API Data:</h3>
          {result?.status === 200 && (
            <div>
              <p>Business Name: {result.name}</p>
              <p>Location: {result.results[0].vicinity}</p>
              <p>Latitude: {result.results[0].geometry.location.lat}</p>
              <p>Longitude: {result.results[0].geometry.location.lng}</p>
              <p>Rating: {result.results[0].rating}</p>
            </div>
          )}
          {result?.status !== "OK" && (
            <p>No results found.</p>
          )}
          {result && (
            <div>
              <h3>API Response:</h3>
              <p>Business Name: {result[0].name}</p>
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
