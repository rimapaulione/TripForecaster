import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByCoordinates } from "../../services/weatherService";

const initialState = {
  cities: [],
  forecast: [],
  activeCity: {},
  status: "idle",
  error: null,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    deleteCity(state, action) {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      state.activeCity = {};
    },
    getCity(state, action) {
      const city = state.cities.filter((city) => city.id === action.payload);
      state.activeCity = city[0];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "idle";
        state.cities.push(action.payload);
        state.activeCity = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const fetchWeather = createAsyncThunk(
  "map/fetchWeather",
  async function ({ lat, lng }) {
    const response = await fetchWeatherByCoordinates(lat, lng);
    return {
      lat,
      lng,
      weather: response.weather,
      name: response.name,
      temp: response.main.temp,
      id: response.id,
    };
  }
);

export const { deleteCity, getCity } = mapSlice.actions;
export default mapSlice.reducer;
