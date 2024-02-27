import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { WiSunrise } from "react-icons/wi";

import CityForecast from "../ui/CityForecast";
import styles from "./Forecast.module.css";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

function Forecast() {
  const { forecasts, status, error } = useSelector((state) => state.forecast);
  if (status === "loading") return <Spinner />;
  if (status === "error") return <Error error={error} />;
  if (forecasts.length === 0)
    return (
      <Link to="/weather" className="cta">
        {" "}
        Start planning
        <WiSunrise />
      </Link>
    );

  return (
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
  );
}

export default Forecast;
