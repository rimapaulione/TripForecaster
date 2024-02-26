import { useDispatch, useSelector } from "react-redux";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { URL } from "../utils/constants";
import { deleteCity } from "../features/map/mapSlice";
import { deleteForecast } from "../features/forecast/forecastSlice";

function CityItem({ city }) {
  const { activeCity } = useSelector((state) => state.map);
  const dispath = useDispatch();

  const { name: cityName, weather, id, lat, lng, temp } = city;

  function handleClick(e) {
    e.preventDefault();
    dispath(deleteCity(id));
    dispath(deleteForecast(id));
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === activeCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <img
          src={`${URL}/img/w/${weather[0].icon}.png`}
          alt="Weather Icon"
          className={styles.icon}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.temp}>{Math.floor(temp)} °C</span>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
