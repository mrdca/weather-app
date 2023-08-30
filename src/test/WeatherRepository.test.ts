import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchWeatherData } from '../data/WeatherRepository';
import { API_WEATHERSTACK_URL } from '../Constants/constants';

const mock = new MockAdapter(axios);

describe('fetchWeatherData', () => {
  it('fetches weather data successfully', async () => {
    const zipCode = '12345';
    const responseData = {};

    mock.onGet(API_WEATHERSTACK_URL).reply(200, responseData);

    const result = await fetchWeatherData(zipCode);

    expect(result).toEqual(responseData);
  });

  it('handles errors when fetching weather data', async () => {
    const zipCode = '12345';

    mock.onGet(API_WEATHERSTACK_URL).reply(404);

    await expect(fetchWeatherData(zipCode)).rejects.toThrow();
  });
});
