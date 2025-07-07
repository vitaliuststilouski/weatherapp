import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => `weather?city=${encodeURIComponent(city)}`,
    }),
    getCitySuggestions: builder.query({
      query: (searchTerm) => `cities?query=${encodeURIComponent(searchTerm)}`,
    }),
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `weather/coordinates?lat=${lat}&lon=${lon}`,
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetCitySuggestionsQuery,
  useGetWeatherByCoordsQuery,
} = weatherApi;
