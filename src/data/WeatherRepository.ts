import axios, { AxiosRequestConfig } from 'axios';
import { GET_METHOD, API_WEATHERSTACK_URL } from '../Constants/constants';

const API_KEY = process.env.API_KEY;

export async function fetchWeatherData(zipCode: string): Promise<any> {
  const config: AxiosRequestConfig = {
    method: GET_METHOD,
    url: API_WEATHERSTACK_URL,
    maxRedirects: 0,
    params: {
      access_key: API_KEY,
      query: zipCode
    }
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
