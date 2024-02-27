import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./ForecastSidebar.module.css";
import CityForecast from "../ui/CityForecast";
import Message from "../ui/Message";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

function ForecastSidebar() {
  const { forecasts, status, error } = useSelector((state) => state.forecast);
  if (status === "loading") return <Spinner />;
  if (status === "error") return <Error error={error} />;
  if (forecasts.length === 0) return <Message message="Start adding cities" />;

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

      <Link to="/forecast" className="cta">
        Forecast
      </Link>
    </>
  );
}

export default ForecastSidebar;
