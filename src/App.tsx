import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherInfo from './components/WeatherInfo';
import { isValidZipCode } from './utils/ValidationUtils';
import { fetchWeatherData } from './data/WeatherRepository';
import { AppLiterals } from './Constants/constants';

interface Location {
  name: string;
  country: string;
}

interface Current {
  observation_time: string;
  temperature: number;
  weather_icons: string[];
  uv_index: number;
  wind_speed: number;
  weather_descriptions: string[];
}

export interface WeatherData {
  [x: string]: any;
  location: Location;
  current: Current;
}

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isValidZip, setIsValidZip] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFetchWeatherData = async () => {
    try {
      if (!isValidZipCode(zipCode)) {
        setIsValidZip(false);
        return;
      }

      setIsValidZip(true);
      setErrorMessage(null);

      const data: WeatherData = await fetchWeatherData(zipCode);
      if (!data.current) {
        setErrorMessage(data.error.info);
        return;
      }
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setErrorMessage('An error occurred while fetching weather data.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">{AppLiterals.APP_NAME}</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className={`form-control ${isValidZip ? '' : 'is-invalid'}`}
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                setIsValidZip(true);
              }}
            />
            {!isValidZip && <div className="invalid-feedback" id="invalid">{AppLiterals.ZIP_CODE_VALIDATION_MESSAGE}</div>}
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleFetchWeatherData}>
                {AppLiterals.GET_WEATHER_BUTTON_TEXT}
              </button>
            </div>
          </div>
          {errorMessage && ( // Render error message if present
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {weatherData && <WeatherInfo weatherData={weatherData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
