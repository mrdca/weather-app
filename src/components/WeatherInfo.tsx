import React from 'react';
import { WeatherData } from '../App';
import WeatherSummary from '../components/WeatherSummary';
import './../css/WeatherInfo.css';
import { WeatherInfoLiterals } from '../Constants/constants';

interface WeatherInfoProps {
  weatherData: WeatherData;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  const isNotRaining = !weatherData.current.weather_descriptions.includes('rain');
  const shouldGoOutside = isNotRaining;
  const shouldWearSunscreen = weatherData.current.uv_index && weatherData.current.uv_index > 3;
  const canFlyKite = isNotRaining && weatherData.current.wind_speed && weatherData.current.wind_speed > 15;


  return (
    <div className="weather-info mt-4">
      <WeatherSummary weatherData={weatherData} />
      <h2>{WeatherInfoLiterals.USER_RECOMMENDATIONS}</h2>
      <p>
        {WeatherInfoLiterals.OUTSIDE_QUESTION}
        <span className={shouldGoOutside ? 'yes' : 'no'}>
          <strong>{shouldGoOutside ? 'Yes' : 'No'}</strong>
        </span>
      </p>
      <p>
        {WeatherInfoLiterals.SUNSCREEN_QUESTION}
        <span className={shouldWearSunscreen ? 'yes' : 'no'}>
          <strong>{shouldWearSunscreen ? 'Yes' : 'No'}</strong>
        </span>
      </p>
      <p>
        {WeatherInfoLiterals.FLY_A_KITE_QUESTION}
        <span className={canFlyKite ? 'yes' : 'no'}>
          <strong>{canFlyKite ? 'Yes' : 'No'}</strong>
        </span>
      </p>
    </div>
  );
};

export default WeatherInfo;