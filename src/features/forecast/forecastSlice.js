import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchForecastByCoordinates } from "../../services/weatherService";
import { getHighestTempForecasts } from "../../utils/helpers";

const initialState = {
  forecasts: [],
  status: "idle",
  error: null,
};

export const fetchForecast = createAsyncThunk(
  "map/forecast",
  async function ({ lat, lng }) {
    const forecastData = await fetchForecastByCoordinates(lat, lng);
    const name = forecastData.city.name;
    const id = forecastData.city.id;

    let highestTempForecasts = [];
    highestTempForecasts = getHighestTempForecasts(forecastData);

    return { name, id, highestTempForecasts };
  }
);
const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    deleteForecast(state, action) {
      state.forecasts = state.forecasts.filter(
        (forecast) => forecast.id !== action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "idle";
        state.forecasts.push(action.payload);
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});
export const { deleteForecast } = forecastSlice.actions;
export default forecastSlice.reducer;
