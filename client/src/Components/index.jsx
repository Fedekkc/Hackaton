import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDays, subDays, format, set } from 'date-fns';

const Body = styled.body`
  margin: 0px;
  background-color: #fcffdf;
  font-family: 'Roboto Condensed', sans-serif; /* Aplicando la fuente Roboto Condensed */
`;

const Container = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
`;

const LogoColor = styled.div`
  display: flex;
  justify-content: center;

`;

const TestColor = styled.div`
  background-color: #c1da99;
  width: 100%;
  box-shadow: 5px 8px 15px #969696;
  border-radius: 0px 0px 10px 10px;
`;

const HeaderImg = styled.img`
  max-width: 30%;
  max-height: 100%;
  height: auto;
  vertical-align: middle;
  
`;

const Icons = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #c1da99;
  
`;

const IconImg = styled.img`
  height: 3.5rem;
  width: 7.5rem;
  object-fit: cover;
  object-position: center;
  margin: 0 0.5rem;
  position: relative;
  border-radius: 8px;
    box-shadow: 5px 5px 15px #969696;

`;

const Divider = styled.div`
  border-left: 2px solid #ddf1bc;
  height: 2.5rem;
  margin: 0 0.5rem;
`;

const Stations = styled.div`
  display: flex;
  gap: 5px;
  padding: 2.5px 0;
  text-align: center;
  background-color: #2e7d32;
  color: #d0f0c0;
  align-items: center;
  align-content: center;
  flex-direction: row;
  width: 50%;
  border-radius: 0px 0px 10px 10px;
    box-shadow: 5px 5px 15px #969696;

`;

const StationName = styled.div`
  margin-top: 1.5px;
`;

const ShrinkDivider = styled.div`
  width: 0.5rem;
  height: 2.5rem;
  background-color: #d0f0c0;
  border: 2px solid #d0f0c0;
`;

const ShrinkImg = styled.img`
  width: 65px;
  aspect-ratio: 1.75;
`;

const Station = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
`;

const StationImg = styled.img`
  align-self: center;
  width: 51px;
  aspect-ratio: 1.41;
  cursor: pointer;
  
`;

const Summary = styled.div`
  display: flex;
  gap: 5px;
  padding: 1rem 0.5rem;
  text-align: center;
  background-color: #d0f0c0;
  color: #2e7d32;
  opacity: 0.9;
  border-radius: 2rem;
  margin-top: 2.75rem;
  width: 50%;
  box-shadow: 5px 5px 15px #969696;
    transition: 0.5s;
`;

const SummaryImg = styled.img`
  width: 31px;
  aspect-ratio: 0.97;
  cursor: pointer;
    &:focus {
    border: none;
    outline: none;
  }


`;

const SummaryText = styled.div`
  flex: 1;
  align-self: center;
`;

const Metrics = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #d0f0c0;
  max-width: 325px;
  margin-top: 3.5rem;
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9rem;
  height: 9rem;
  background-color: #2e7d32;
  opacity: 0.8;
  border-radius: 2rem;
  padding: 0.5rem;
  box-shadow: 5px 5px 15px #969696;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MetricTitle = styled.div`
  font-size: 2rem;
`;

const MetricSubtitle = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const MetricValue = styled.div`
  font-size: 2rem;
`;

const RadiacionImg = styled.img`
  margin-top: 0.5rem;
  width: 6rem;
  aspect-ratio: 1.25;
`;

const Averages = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const AveragesContent = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

//Styled component de iframe

const Iframe = styled.iframe `
  width: 7rem;
  height: 7rem;
  margin-top: 3rem;
  border: 10px solid #c1da99;
  border-radius: 50rem;
`;

const UIContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;


`;

const Web = ({ sensorData }) => {
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [light, setLight] = useState(null);

  //fetch a world time api
  var horaLocal = new Date()
  
  fetch("http://worldtimeapi.org/api/timezone/America/Asuncion")
    .then((response) => response.json())
    .then((hora) => {
      horaLocal = new Date(hora.datetime);
    })

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTemp(sensorData.temp);
    setHumidity(sensorData.humidity);
    setWind(sensorData.wind);
    setLight(sensorData.light);
    setCurrentDate(horaLocal);
  }, [sensorData]);

  const handleSummaryClick = (summaryType) => {
    let newDate = currentDate;

    if (summaryType === 'next') {
      // detectar si el dia que sigue sobrepasa el actual real
      if (horaLocal.getDate() <= currentDate.getDate()) {
        return;
      } else {  
      
        newDate = addDays(currentDate, 1);
      }
    } else if (summaryType === 'previous') {
      // detectar si hay registros para ese dia


      newDate = subDays(currentDate, 1);
    }

    setCurrentDate(newDate);

    const formattedDate = format(newDate, 'yyyy-MM-dd');
    const apiUrl = `http://192.168.0.244:5000/getHistoric/${formattedDate}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTemp(data[0].temp);
        setHumidity(data[0].hum);
        setWind(data[0].wind);
        setLight(data[0].light);
      })
      .catch((error) => console.error('Error fetching summary:', error));
  };

  return (
    <Body>
      <Container>
        <Header>
          <TestColor>
            <LogoColor>
              <HeaderImg loading="lazy" src="logo forca.png" className="header-img" />
            </LogoColor>
            <Icons>
              <Divider />
              <IconImg
                loading="lazy"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-fP-jrkSTCJMyYjCF-Zixas_ZffiNsdK7Q&s"
                className="icon-img"
              />
              <Divider />
              <IconImg
                loading="lazy"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxxQhw69nVXMB8vkhbNkxYlaVuhmOiLSzag&s"
                className="icon-img"
              />
              <Divider />
              <IconImg
                loading="lazy"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Paraguay.svg/2560px-Flag_of_Paraguay.svg.png"
                className="icon-img"
              />
              <Divider />
              <IconImg
                loading="lazy"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBQpMK0uDR72IN1bl5jqX6RRFyZVNoCzcLg&s"
                className="icon-img"
              />
            </Icons>
          </TestColor>
          <Stations>
            <Station>
              <StationImg
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e2b17a4b0256442180e37748f3eac0d4c184c89c3e1e1a1d4fd92ba29dc3538?apiKey=7872de7c13c248d784875765763f4956&"
                alt="Estación 1"
              />
              <StationName>Estación 1</StationName>
            </Station>
            <Station>
              <StationImg
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e2b17a4b0256442180e37748f3eac0d4c184c89c3e1e1a1d4fd92ba29dc3538?apiKey=7872de7c13c248d784875765763f4956&"
                alt="Estación 2"
              />
              <StationName>Estación 2</StationName>
            </Station>
            <Station>
              <StationImg
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e2b17a4b0256442180e37748f3eac0d4c184c89c3e1e1a1d4fd92ba29dc3538?apiKey=7872de7c13c248d784875765763f4956&"
                alt="Estación 3"
              />
              <StationName>Estación 3</StationName>
            </Station>
            <Station>
              <StationImg
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e2b17a4b0256442180e37748f3eac0d4c184c89c3e1e1a1d4fd92ba29dc3538?apiKey=7872de7c13c248d784875765763f4956&"
                alt="Estación 4"
              />
              <StationName>Estación 4</StationName>
            </Station>
          </Stations>
        </Header>
        <BodyContainer>

          <Summary>
            <SummaryImg
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/42649c2252924265cbc11f644eda67428e31108fb4895c2e4f5ab053ab2e9544?apiKey=7872de7c13c248d784875765763f4956&"
              alt="Summary"
              onClick={() => handleSummaryClick('previous')}
            />
            <SummaryText>{format(currentDate, 'yyyy-MM-dd').toString()}</SummaryText>
            <SummaryImg
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/824f15546539d0fe612de10103f0f19d4b742738e1f7f70f7ed8d6af35471ac8?apiKey=7872de7c13c248d784875765763f4956&"
              alt="Summary"
              onClick={() => handleSummaryClick('next')}
            />

          </Summary>

          <Metrics>
            <Metric>
              <MetricTitle>Temp</MetricTitle>
              <MetricSubtitle>Actual</MetricSubtitle>
              <MetricValue>{temp}°C</MetricValue>
            </Metric>
            <Metric>
              <MetricTitle>Humedad</MetricTitle>
              <MetricSubtitle>Actual</MetricSubtitle>
              <MetricValue>{humidity}%</MetricValue>
            </Metric>
          </Metrics>
          <Metrics>
            <Metric>
              <MetricTitle>Luz solar</MetricTitle>
              <MetricSubtitle>Actual</MetricSubtitle>
              <MetricValue>{light}</MetricValue>
            </Metric>
            <Metric>
              <MetricTitle>Viento</MetricTitle>
              <MetricSubtitle>Actual</MetricSubtitle>
              <MetricValue>{Number(wind).toFixed(2)}km/h</MetricValue>
            </Metric>
          </Metrics>
        </BodyContainer>
      </Container>
    </Body>
  );
};

export default Web;
