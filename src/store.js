import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/map/mapSlice";
import forecastReducer from "./features/forecast/forecastSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    forecast: forecastReducer,
  },
});
export default store;
