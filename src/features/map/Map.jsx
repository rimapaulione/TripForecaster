import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./mapSlice";
import { useGeolocation } from "../../hooks/useGeolocation";

import styles from "./Map.module.css";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";
import { fetchForecast } from "../forecast/forecastSlice";

function Map() {
  const [mapPosition, setMapPosition] = useState();
  const { cities } = useSelector((state) => state.map);

  const {
    position: geolocationPosition,
    getPosition,
    error,
  } = useGeolocation();

  useEffect(
    function () {
      if (!mapPosition) getPosition();
    },
    [getPosition, mapPosition]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

      if (error) setMapPosition([10, 24]);
    },
    [geolocationPosition, error]
  );

  return (
    <div className={styles.mapContainer}>
      {!mapPosition ? (
        <Spinner />
      ) : (
        <MapContainer
          center={mapPosition}
          zoom={7}
          closePopupOnClick={false}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker position={[city.lat, city.lng]} key={city.id}>
              <Popup autoClose={false}>
                <span>{`${Math.floor(city.temp)}°C `}</span>
                <span>{` ${city.name}`}</span>{" "}
              </Popup>
            </Marker>
          ))}

          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      )}
    </div>
  );
}

function DetectClick() {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.map);
  const { id } = useParams();

  useMapEvents({
    click: (e) => {
      if (id) return;
      const { lat, lng } = e.latlng;

      const exists = cities.filter(
        (city) => city.lat === lat && city.lng === lng
      );
      if (exists.length === 0) {
        dispatch(fetchWeather({ lat, lng }));
        dispatch(fetchForecast({ lat, lng }));
      } else {
        return;
      }
    },
  });
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
