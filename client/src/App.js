import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styled from 'styled-components'
import Web from './Components/index.jsx';
import BarChart from './Components/BarChart.jsx';


//Styled component de div

const Container = Styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fcffdf;

`;

const MapContainer = Styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcffdf;
`;  

//Styled component de iframe

const Iframe = Styled.iframe `
  width: 20rem;
  height: 20rem;
  margin-top: 3rem;
  border: 10px solid #c1da99;
  border-radius: 50rem;
    box-shadow: 5px 5px 15px #969696;

`;


function App() {
  const [sensorData, setSensorData] = useState({
    humidity: '',
    temp: '',
    light: '',
    wind: '',
    id: ''
  });

  const [days, setDays] = useState([]);

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
          date: response.data[0].date,
          id: response.data[0].id
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the sensor data!", error);
      });

    axios.get('http://192.168.0.244:5000/getLastDays')
      .then((response) => {
        setDays(response.data); // Establece todos los días obtenidos
      })
      .catch((error) => {
        console.error("There was an error fetching the last days data!", error);
      });
  }, []);

  return (
    <Container>
      <Web sensorData={sensorData} setSensorData={setSensorData} />
      {days.length > 0 && <BarChart days={days} />}
      <MapContainer>

      <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.5797911779173!2d-57.4610377897294!3d-25.385396031033604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945db2813955c939%3A0x104e6cab23ce1ae8!2sLos%20Lagos%20Resort%20Hotel!5e0!3m2!1ses-419!2spy!4v1719598274974!5m2!1ses-419!2spy"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>
      </MapContainer>
    </Container>
  );
}

export default App;
