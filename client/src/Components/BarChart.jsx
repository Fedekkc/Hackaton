// src/components/BarChart.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

import { Bar } from 'react-chartjs-2';


import axios from 'axios';
import { format, subDays } from 'date-fns';

//Styled component para el select
const Select = styled.select`
  background-color: #C1DA99;
  font-color: #288F37;
  border-radius: 50px;
  border: none;
  height: 3.0rem;
  width: 10.0rem;
  text-align: center;
  /* Movemos el texto a la izquierda para que no se vea */
  padding-left: 0.1rem;

  margin-bottom: 3.0rem;
  -webkit-appearance: none; /* Safari y Chrome */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* Resto de navegadores */
    box-shadow: 5px 5px 15px #969696;

  &:hover {
    border: none;
    box-shadow: 0 0 0.5rem #000000;
    transition: 0.5s;
  }

  &:focus {
    border: none;
    outline: none;
  }



  `;

//Styled component para el div
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  background-color: #fcffdf;

`;




// Registrando los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement , Title, Tooltip, Legend);




// Plugin para cambiar el color de fondo del gráfico
const backgroundColorPlugin = {
  id: 'backgroundColor',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(193, 218, 153, 1.0)'; // Fondo negro
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

// Registra el plugin
ChartJS.register(backgroundColorPlugin);

const BarChart = () => {
  const [days, setDays] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('temp'); // Métrica por defecto
  const [chartKey, setChartKey] = useState(Date.now()); // Clave única para forzar la remontaje del gráfico

  useEffect(() => {
    axios.get('http://192.168.0.244:5000/getLastDays')
      .then((response) => {
        setDays(response.data[0]); // Configura los días obtenidos del servidor
      })
      .catch((error) => {
        console.error("Error fetching last days data:", error);
      });
  }, []);

  const mapMetricToValue = (metric, day) => {
    switch (metric) {
      case 'humidity':
        console.log(day)
        return day.hum;
      case 'temp':
        return day.temp;
      case 'light':
        switch (day.light) {
          case 'Alta':
            return 100;
          case 'Media':
            return 50;
          case 'Baja':
            return 10;
          default:
            return 0;
        }
      case 'wind':
        return day.wind;
      default:
        return 0;
    }
  };

  const data = {
    labels: days.map((day) => format(new Date(day.date), 'yyyy-MM-dd')), // Formatea las fechas para etiquetas más cortas
    datasets: [{
      label: `Datos - ${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`,
      data: days.map((day) => mapMetricToValue(selectedMetric, day)),
      fill: false,
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
      pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)', // Color de las etiquetas de la leyenda
        },
      },
      title: {
        display: true,
        text: `Datos - ${selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}`,
        color: 'rgba(255, 255, 255, 0.7)', // Color del título
        font: {
          size: 20,
        },
      },
      tooltip: { // el tooltip es el cuadro que aparece al pasar el cursor sobre el gráfico
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)', // Color de las etiquetas de los ejes
        },
        grid: {
          color: 'rgba(252, 255, 223, 0.1)', // Color de las líneas de la cuadrícula
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)', // Color de las etiquetas de los ejes
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Color de las líneas de la cuadrícula
        },
      },
    },
  };

  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
    setChartKey(Date.now()); // Cambiar la clave para forzar la remontaje del gráfico
  };

  return (
    <Container>
      <Select onChange={handleMetricChange} value={selectedMetric}>
        <option value="humidity">Humedad</option>
        <option value="temp">Temperatura</option>
        <option value="light">Luz solar</option>
        <option value="wind">Viento</option>
      </Select>
      <Line key={chartKey} data={data} options={options} />
    </Container>
  );
};

export default BarChart;