// Function to find the forecast with the highest temperature for each day
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    weekday: "short",
  }).format(new Date(date));

export const getHighestTempForecasts = (forecasts) => {
  const highestTempForecasts = {};

  forecasts.list.map((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dateString = formatDate(date);

    if (
      !highestTempForecasts[dateString] ||
      highestTempForecasts[dateString].main.temp < forecast.main.temp
    ) {
      highestTempForecasts[dateString] = forecast;
    }
  });

  return highestTempForecasts;
};
