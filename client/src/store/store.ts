import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "@/services/weatherApi";
import { weatherSliceReducer } from "@/store/weatherSlice";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weather: weatherSliceReducer,
  },
  middleware: (getDefault) => getDefault().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
