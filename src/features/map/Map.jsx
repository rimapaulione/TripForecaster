import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
import { fetchForecast } from "../forecast/forecastSlice";

import styles from "./Map.module.css";
import Button from "../../ui/Button";

function Map() {
  const { cities } = useSelector((state) => state.map);
  const [mapPosition, setMapPosition] = useState([55, 23]);
  const [searchParams] = useSearchParams();

  const {
    isLoading,
    position: geolocationPosition,
    getPosition,
    error,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function () {
      if (cities.length !== 0) {
        const { lat } = cities.slice(-1)[0];
        const { lng } = cities.slice(-1)[0];
        setMapPosition([lat, lng]);
      }
    },
    [cities]
  );

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

      if (error) setMapPosition([55, 23]);
    },
    [geolocationPosition, error]
  );
  console.log("test");
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading..." : "Get Position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={5}
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
      )
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
