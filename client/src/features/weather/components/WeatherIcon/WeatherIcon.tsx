import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import styles from "./WeatherIcon.module.css";
import { IWeatherIconProps } from "./WeatherIconProps";

export const WeatherIcon = ({ code, className = "" }: IWeatherIconProps) => {
  if (code >= 200 && code < 300)
    return <WiThunderstorm className={`${styles.weatherIcon} ${className}`} />;
  if (code >= 300 && code < 600)
    return <WiRain className={`${styles.weatherIcon} ${className}`} />;
  if (code >= 600 && code < 700)
    return <WiSnow className={`${styles.weatherIcon} ${className}`} />;
  if (code >= 700 && code < 800)
    return <WiFog className={`${styles.weatherIcon} ${className}`} />;
  if (code === 800)
    return <WiDaySunny className={`${styles.weatherIcon} ${className}`} />;
  if (code > 800 && code < 900)
    return <WiCloudy className={`${styles.weatherIcon} ${className}`} />;
  return <WiDaySunny className={`${styles.weatherIcon} ${className}`} />;
};
