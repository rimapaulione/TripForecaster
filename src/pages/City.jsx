import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getCity } from "../features/map/mapSlice";

import { useMoveBack } from "../hooks/useMoveBack";
import { fetchForecastByCoordinates } from "../services/weatherService";
import { getHighestTempForecasts } from "../utils/helpers";

import styles from "./City.module.css";
import BackButton from "../ui/BackButton";
import CityForecast from "../ui/CityForecast";
import { HiOutlineChevronRight } from "react-icons/hi2";

function City() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const moveBack = useMoveBack();
  const forecast = useLoaderData();
  console.log(forecast);

  useEffect(
    function () {
      dispatch(getCity(+id));
    },
    [id, dispatch]
  );

  return (
    <>
      <div className={styles.container}>
        <p className={styles.name}>{forecast.name}</p>
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
        <div>
          <a
            href={`https://en.wikipedia.org/wiki/${forecast.name}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {forecast.name} on Wikipedia <HiOutlineChevronRight />
          </a>
        </div>
      </div>

      <BackButton onClick={moveBack} type="back">
        &larr; Go back
      </BackButton>
    </>
  );
}

export default City;

export async function loader({ request }) {
  const url = new URL(request.url);
  const lng = url.searchParams.get("lng");
  const lat = url.searchParams.get("lat");

  const forecastData = await fetchForecastByCoordinates(lat, lng);
  const name = forecastData.city.name;

  let highestTempForecasts = [];
  highestTempForecasts = getHighestTempForecasts(forecastData);

  return { name, highestTempForecasts };
}
