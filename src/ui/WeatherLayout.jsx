import styles from "./WeatherLayout.module.css";

import Sidebar from "./Sidebar";
import Map from "../features/map/Map";

function WeatherLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default WeatherLayout;
