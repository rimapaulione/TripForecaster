import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <div>
        <img src="/weather.png" alt="weather map logo" />
        <h3>Trip Forecaster</h3>
      </div>
    </Link>
  );
}

export default Logo;
