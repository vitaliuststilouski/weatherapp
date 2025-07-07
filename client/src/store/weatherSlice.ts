import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  searchedCity: string | null;
  coordinates: { lat: number; lon: number } | null;
}

const initialState: WeatherState = {
  searchedCity: null,
  coordinates: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.searchedCity = action.payload;
      state.coordinates = null;
    },
    setCoordinates: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.coordinates = action.payload;
      state.searchedCity = null;
    },
  },
});

export const { setCity, setCoordinates } = weatherSlice.actions;
export const weatherSliceReducer = weatherSlice.reducer;
