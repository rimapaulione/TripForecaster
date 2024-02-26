import { API_KEY, FORECAST_URL } from "../utils/constants";
import { BASE_URL } from "../utils/constants";

export const fetchWeatherByCoordinates = async function (lat, lng) {
  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Faild to fetch weather data: ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchForecastByCoordinates = async function (lat, lng) {
  try {
    const url = `${FORECAST_URL}?lat=${lat}&lon=${lng}&exclude=minutely,hourly,current,alerts&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Faild to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
};
