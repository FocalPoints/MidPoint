import React, { useState, useEffect } from 'react';

const Weather = (props) => {
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isCelsius, setIsCelsius] = useState(false);
  const [isKph, setIsKph] = useState(false);
  const [isMm, setIsMm] = useState(false);
  const [forecastState, setForecastState] = useState([]);
  const [showForecast, setShowForecast] = useState(false);

  const forecast = [];
  const alerts = [];

  console.log('SUCCESSFULLY SETTING NEW STATE', weatherDetails);

  useEffect(() => {
    fetch('/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.midpoint)
    })
      .then(res => res.json())
      .then(data => {
        console.log('RETRIEVED DATA FROM BACKEND NOW IN WEATHER COMPONENT', data);
        setWeatherDetails(data);
      })
  }, [props.midpoint]);

  const changeTempFormat = () => {
    setIsCelsius(!isCelsius);
  }

  const changeWindFormat = () => {
    setIsKph(!isKph);
  }

  const changeRainFormat = () => {
    setIsMm(!isMm);
  }


  const populateForecast = () => {
    let key = 0;

    for (let hour of weatherDetails.forecast) {
      if (hour.time > weatherDetails.localTime) {
        console.log('ENTERED IF BLOCK');
        if (isCelsius) {
          forecast.push(
            <div key={key} className="forecast-hour-wrapper">
              <p>{ hour.temp_c } ˚C</p>
              <p>Condition: { hour.condition.text } <img src={ hour.condition.icon } /></p>
            </div>
          )
        }
        if (!isCelsius) {
          forecast.push(
            <div key={key} className="forecast-hour-wrapper">
              <p>{ hour.temp_f } ˚F</p>
              <p>Condition: { hour.condition.text } <img src={ hour.condition.icon } /></p>
            </div>
          )
        }
        key++;
      }
    }
    setForecastState(forecast);
    setShowForecast(!showForecast);
  }


  const populateAlerts = () => {

  }




  return (
    <div className="weather-wrapper">
      <h1>
        Weather
      </h1>
      <div className="weather-current-wrapper">
        <h2> { weatherDetails.name } </h2>
        <h3> { weatherDetails.region } </h3>
        <p> { weatherDetails.lastUpdated } </p>

        {isCelsius && <p className="weather-temperature" onClick={ changeTempFormat }> { weatherDetails.tempC } ˚C </p>}
        {isCelsius || <p className="weather-temperature" onClick={ changeTempFormat }> { weatherDetails.tempF } ˚F </p>}

        <div className="weather-condition">
          <img src={ weatherDetails.conditionImg }></img>
          <p> { weatherDetails.condition } </p>
        </div>

        <div className="weather-wind-rain">
          {isKph && <p onClick={ changeWindFormat }>WIND: { weatherDetails.windKph }</p>}
          {isKph || <p onClick={ changeWindFormat }>WIND: { weatherDetails.windMph }</p>}

          {isMm && <p onClick={ changeRainFormat }>RAIN: { weatherDetails.precipMm }</p>}
          {isMm || <p onClick={ changeRainFormat }>RAIN: { weatherDetails.precipIn }</p>}
        </div>
      </div>

      <div className="weather-forecast-wrapper">
        <button onClick={ populateForecast }>See Forecast</button>
        { showForecast && forecastState }
      </div>

      <div className="weather-alerts-wrapper">
        {/* <button onClick={ populateAlerts }>See Alerts</button>
        { showAlerts && alertState } */}
      </div>
    </div>
  )
}

{/* weatherDetails.name = data.location.name;
weatherDetails.region = data.location.region;
weatherDetails.localTime = data.location.localtime;
weatherDetails.lastUpdated = data.current.last_updated;
weatherDetails.tempC = data.current.temp_c;
weatherDetails.tempF = data.current.temp_f;
weatherDetails.condition = data.current.condition.text;
weatherDetails.conditionImg = data.current.condition.icon;
weatherDetails.windMph = data.current.wind_mph;
weatherDetails.windKph = data.current.wind_kph;
weatherDetails.precipMm = data.current.precip_mm;
weatherDetails.precipIn = data.current.precip_in;
weatherDetails.forecast = data.forecast.forecastday.hour;
weatherDetails.alerts = data.alerts.alert; */}

export default Weather;