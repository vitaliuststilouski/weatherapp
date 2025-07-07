import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiThermometer
} from "react-icons/wi";

import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import { WeatherDetailItem } from "../WeatherDetailItem/WeatherDetailItem";
import {
  getUvIndexLevel,
  getWeatherConditionClass,
} from "@/common/utils/weatherUtils";

import { IWeatherCardProps } from "./IWeatherCardProps";
import styles from "./WeatherCard.module.css";

export const WeatherCard = ({ data }: IWeatherCardProps) => {
  if (!data) {
    return <div className={styles.noData}>No weather data available</div>;
  }

  return (
    <div
      className={`${styles.card} ${
        styles[getWeatherConditionClass(data.weather?.code)]
      }`}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.city}>
            {data.city_name}, {data.country_code}
          </h2>
          <p className={styles.date}>
            {new Date(data.ob_time).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.currentTemp}>
          {Math.round(data.temp)}°C
          <WeatherIcon code={data.weather.code} />
        </div>
      </div>

      <div className={styles.weatherDetails}>
        <div className={styles.condition}>
          <span className={styles.conditionText}>
            {data.weather.description}
          </span>
          <span className={styles.feelsLike}>
            <WiThermometer /> Feels like: {Math.round(data.app_temp)}°C
          </span>
        </div>

        <div className={styles.detailGrid}>
          <WeatherDetailItem
            icon={<WiHumidity />}
            label="Humidity"
            value={`${data.rh}%`}
          />
          <WeatherDetailItem
            icon={<WiStrongWind />}
            label="Wind"
            value={`${data.wind_spd.toFixed(1)} m/s ${data.wind_cdir_full}`}
          />
          <WeatherDetailItem
            icon={<WiBarometer />}
            label="Pressure"
            value={`${data.pres.toFixed(0)} hPa`}
          />
          <WeatherDetailItem
            icon={<WiSunrise />}
            label="Sunrise"
            value={data.sunrise}
          />
          <WeatherDetailItem
            icon={<WiSunset />}
            label="Sunset"
            value={data.sunset}
          />
          <WeatherDetailItem
            icon={<span>UV</span>}
            label=""
            value={`${data.uv.toFixed(1)} (${getUvIndexLevel(data.uv)})`}
          />
        </div>
      </div>
    </div>
  );
};
