import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import CityForecast from "../ui/CityForecast";
import styles from "./Forecast.module.css";

function Forecast() {
  const { forecasts } = useSelector((state) => state.forecast);
  console.log(forecasts);

  return (
    <>
      <div className={styles.container}>
        {forecasts.map((forecast) => (
          <div key={forecast.id}>
            <h1>{forecast.name}</h1>

            <div className={styles.forecast}>
              {Object.entries(forecast.highestTempForecasts).map(
                ([date, forecast], idx) => (
                  <CityForecast
                    key={idx}
                    icon={forecast.weather[0].icon}
                    temp={forecast.main.temp}
                    date={date}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <Link to="/weather" className="cta">
        Forecast
      </Link>
    </>
  );
}

export default Forecast;
