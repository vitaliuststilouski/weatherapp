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

const WEATHER_ICONS = {
  THUNDERSTORM: WiThunderstorm,
  RAIN: WiRain,
  SNOW: WiSnow,
  FOG: WiFog,
  CLEAR: WiDaySunny,
  CLOUDS: WiCloudy,
};

const getIconComponent = (code: number) => {
  if (code >= 200 && code < 300) return WEATHER_ICONS.THUNDERSTORM;
  if (code >= 300 && code < 600) return WEATHER_ICONS.RAIN;
  if (code >= 600 && code < 700) return WEATHER_ICONS.SNOW;
  if (code >= 700 && code < 800) return WEATHER_ICONS.FOG;
  if (code === 800) return WEATHER_ICONS.CLEAR;
  if (code > 800 && code < 900) return WEATHER_ICONS.CLOUDS;
  return WEATHER_ICONS.CLEAR;
};

export const WeatherIcon = ({ code, className = "" }: IWeatherIconProps) => {
  const IconComponent = getIconComponent(code);

  return (
    <IconComponent
      className={`${styles.weatherIcon} ${className}`}
      data-testid={`weather-icon-${code}`}
    />
  );
};
