import { useSelector } from "react-redux";
import styles from "./CityList.module.css";
import Message from "../ui/Message";

import CityItem from "../ui/CityItem";
import Spinner from "../ui/Spinner";
import Error from "../ui/Error";

function CityList() {
  const { cities, status, error } = useSelector((state) => state.map);

  if (status === "loading") return <Spinner />;
  if (status === "error") return <Error error={error} />;
  if (cities.length === 0) return <Message message="Start adding cities" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
