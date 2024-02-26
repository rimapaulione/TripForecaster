import { Link } from "react-router-dom";
import { WiSunrise } from "react-icons/wi";

import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <main className={styles.homepage}>
        <section>
          <img
            src="/weather.png"
            alt="weather map logo"
            className="logo-small"
          />
          <h1>
            Your trip weather.
            <br />
            <br />
            Pin your trip on the map and check the forecast.
          </h1>

          <Link to="/weather" className="cta">
            Start planning
            <WiSunrise />
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;
