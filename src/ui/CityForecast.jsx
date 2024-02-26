import styles from "./CityForecast.module.css";

function CityForecast({ idx, date, icon, temp }) {
  return (
    <div key={idx} className={styles.city}>
      <div className={styles.cityweather}>
        <p>{date}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="Weather Icon"
        />
        <p> {Math.floor(temp)}°C</p>
      </div>
    </div>
  );
}

export default CityForecast;
