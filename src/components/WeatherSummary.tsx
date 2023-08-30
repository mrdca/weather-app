import React from 'react';
import { WeatherData } from '../App';
import './../css/WeatherSummary.css'
import { WeatherSummaryLiterals } from '../Constants/constants';

interface WeatherSummaryProps {
  weatherData: WeatherData;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ weatherData }) => {
  const { location, current } = weatherData;
  const weatherIconUrl = weatherData.current.weather_icons[0];


  return (
    <div className="weather-summary">
      <h3>{WeatherSummaryLiterals.WEATHER_INFO}</h3>
      <div className="recommendation-container">
        <div className="recommendation-icon">
          {weatherIconUrl && <img src={weatherIconUrl} alt="Weather Icon" />}
        </div>
        <p>{WeatherSummaryLiterals.CITY} {location.name}</p>
        <p>{WeatherSummaryLiterals.COUNTRY} {location.country}</p>
        <p>{WeatherSummaryLiterals.OBSERVATION_TIME} {current.observation_time}</p>
        <p>{WeatherSummaryLiterals.TEMPERATURE} {current.temperature}°C</p>
        <p>{WeatherSummaryLiterals.UV_INDEX} {current.uv_index}</p>
      </div>
    </div>
  );
};

export default WeatherSummary;
