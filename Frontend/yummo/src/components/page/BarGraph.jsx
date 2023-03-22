import React from 'react';
import './centre.css';
import './sidebar.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BarGraph = () => {
  const [reservations, setReservations] = useState({});
  const token= "5a99c68c923d65db2c51da84a736ddc6ac41a40a";
  //const [restId, setId] = useState({});
  const restId = 1;
  
  useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/restaurants/"+restId+"/reservations", {
            headers: {
                'Authorization': `Token ${token}`,
            },
          })
            .then((response) => {
                 setReservations(response['data'])
            })
          },[]);
  var count1 = 5;
  var count2 = 4;
  var count3 = 3;
  var count4 = 5;
  var key;
  var today = new Date();
  for(key in reservations['reserved_at'])
  {
    if(Date.parse(key)>today.getDate() && Date.parse(key)<today.getDate()+7)
    count1++;
    else if(Date.parse(key)<today.getDate()+14)
    count2++;
    else if(Date.parse(key)<today.getDate()+21)
    count3++;
    else count4++;
  }
  const data1 = [count1,count2,count3,count4];
  const maxValue = Math.max(...data1);
  
  const barWidth = 10;
  const chartHeight = 50;
  const bars = data1.map((value, index) => {
    const barHeight = value / maxValue * chartHeight;
    const x = index * (barWidth + 10);
    const y = chartHeight - barHeight;
    return (
      <rect
        key={index}
        x={x}
        y={y}
        width={barWidth}
        height={barHeight}
        fill="#00AEB2"
      />
    );
  });

  return (
    <svg viewBox={`0 0 ${data1.length * (barWidth + 20)} ${chartHeight}`}>
    <svg viewBox={`0 0 ${data1.length * (barWidth + 20)} ${chartHeight}`}>
      {bars}
    </svg>
    </svg>
  );
};

export default BarGraph;
