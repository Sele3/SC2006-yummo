import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
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

  axios.post(url, postData, {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',  //content type it 
        'Authorization': `Token ${token}`,
    }
  })
    .then(res => {
        setResult(res.data);
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    })

  return (
    <>
      <h1>This is About page</h1>
      {state && (
        <div>
          <h3>Passed data:</h3>
          <p>InputLocation: {state}</p>
          <p>API Data: {}</p>
        </div>
      )}
      <hr />
      <Link to="/">Go Home</Link>
    </>
  );
};

export default AboutPage;
