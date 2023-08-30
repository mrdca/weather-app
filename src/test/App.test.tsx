/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the app and handles zip code input', async () => {
    const { getByText, getByPlaceholderText} = render(<App />);
    const inputElement = getByPlaceholderText('Enter Zip Code');
    const buttonElement = getByText('Get Weather');

    // Input invalid zip code
    fireEvent.change(inputElement, { target: { value: '1243434343' } });
    fireEvent.click(buttonElement);
    const validationMessageElement = getByText('Please enter a valid zip code.');
    
    await waitFor(() => {
      expect(validationMessageElement).toBeDefined();
      fireEvent.change(inputElement, { target: { value: '12345' } });
      fireEvent.click(buttonElement);
    });

  });

  it('renders the app and handles weather info from API', async () => {
    const { getByPlaceholderText, getByText } = render(<App/>);

    // Input valid zip code
    const inputElement = getByPlaceholderText('Enter Zip Code');
    fireEvent.change(inputElement, { target: { value: '12345' } });

    // Click the "Get Weather" button
    const buttonElement = getByText('Get Weather');
    fireEvent.click(buttonElement);

    // Use waitFor to wait for the WeatherInfo component to appear
    await waitFor(() => {
      const WeatherInfoData = getByText('Weather Info');
      expect(WeatherInfoData).toBeDefined();
    
    });
  });

  it('renders the app and handles weather recommendations', async () => {
    const { getByPlaceholderText, getByText } = render(<App/>);

    // Input valid zip code
    const inputElement = getByPlaceholderText('Enter Zip Code');
    fireEvent.change(inputElement, { target: { value: '12345' } });

    // Click the "Get Weather" button
    const buttonElement = getByText('Get Weather');
    fireEvent.click(buttonElement);

    // Use waitFor to wait for the User recommendations component to appear
    await waitFor(() => {
      const userRecommendations = getByText('User recommendations');
      expect(userRecommendations).toBeDefined();
    
    });
  });
});
