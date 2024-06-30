import styled from 'styled-components';

const Averages = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 5rem;
  color: #d0f0c0;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  background-color: #D8ECB7;
`;

const AveragesContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 5rem;
  color: #d0f0c0;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AveragesMetric2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const AverageMetric = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 12rem;
  height: 9rem;
  background-color: #2e7d32;
  opacity: 0.8;
  border-radius: 2rem;
  padding: 0.5rem;
`;

const AveragesText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AverageTitle = styled.div`
  flex: 1;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #d0f0c0;
`;

const AverageSubtitle = styled.div`
  flex: 1;
  text-align: right;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #d0f0c0;
`;

const AverageValue = styled.div`
  margin-top: 20px;
  font-size: 4rem;
  color: #d0f0c0;
  text-align: center;
`;

const App = () => (
  <Averages>
    <AveragesContent>Promedios</AveragesContent>
    <AveragesMetric2>
      <AverageMetric>
        <AveragesText>
          <AverageTitle>Temperatura</AverageTitle>
          <AverageSubtitle>Ult.7</AverageSubtitle>
        </AveragesText>
        <AverageValue>38</AverageValue>
      </AverageMetric>
      <AverageMetric>
        <AveragesText>
          <AverageTitle>Humedad</AverageTitle>
          <AverageSubtitle>Ult.7</AverageSubtitle>
        </AveragesText>
        <AverageValue>38</AverageValue>
      </AverageMetric>
    </AveragesMetric2>
    <AveragesMetric2>
      <AverageMetric>
        <AveragesText>
          <AverageTitle>Viento</AverageTitle>
          <AverageSubtitle>Ult.7</AverageSubtitle>
        </AveragesText>
        <AverageValue>38</AverageValue>
      </AverageMetric>
      <AverageMetric>
        <AveragesText>
          <AverageTitle>Radiacion</AverageTitle>
          <AverageSubtitle>Ult.7</AverageSubtitle>
        </AveragesText>
        <AverageValue>Media</AverageValue>
      </AverageMetric>
    </AveragesMetric2>
  </Averages>
);

export default App;
