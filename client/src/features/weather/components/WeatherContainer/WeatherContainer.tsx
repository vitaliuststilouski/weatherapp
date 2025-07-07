import {
  useGetCurrentWeatherQuery,
  useGetWeatherByCoordsQuery,
} from "@/services/weatherApi";
import { useAppSelector } from "@/store/hooks";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import styles from "./WeatherContainer.module.css";

export const WeatherContainer = () => {
  const city = useAppSelector((state) => state.weather?.searchedCity);
  const coords = useAppSelector((state) => state.weather?.coordinates);

  const {
    data: cityData,
    error: cityError,
    isLoading: loadingCity,
  } = useGetCurrentWeatherQuery(city!, { skip: !city });

  const {
    data: coordData,
    error: coordError,
    isLoading: loadingCoord,
  } = useGetWeatherByCoordsQuery(coords!, { skip: !coords });

  const data = cityData || coordData;

  const error = cityError || coordError;
  const isLoading = loadingCity || loadingCoord;

  if (!city && !coords)
    return (
      <div className={styles["weather-display"]}>
        Weather information will appear here
      </div>
    );
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading weather data</div>;

  return <WeatherCard data={data} />;
};
