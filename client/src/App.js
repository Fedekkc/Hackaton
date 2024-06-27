import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [sensorData, setSensorData] = useState({
    humidity: '',
    temp: '',
    light: '',
    wind: '',
    id: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    axios.get('http://192.168.0.244:5000/getSensors')
      .then((response) => {
        setResponseMessage(response.data.message);
        setSensorData({
          humidity: response.data[0].hum,
          temp: response.data[0].temp,
          light: response.data[0].light,
          wind: response.data[0].wind,
          id: response.data[0].id
        });
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the sensor data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Sensores</h1>
      <p>{responseMessage}</p>
      <ul>
        <li>Humidity: {sensorData.humidity}</li>
        <li>Temperature: {sensorData.temp}</li>
        <li>Light: {sensorData.light}</li>
        <li>Wind: {sensorData.wind}</li>
        <li>Station ID: {sensorData.id}</li>
      </ul>
    </div>
  );
}

export default App;
