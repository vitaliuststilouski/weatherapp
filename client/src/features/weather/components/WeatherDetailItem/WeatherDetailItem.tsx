import { IWeatherDetailItemProps } from "./WeatherDetailItemProps";
import styles from "./WeatherDetailItem.module.css";

export const WeatherDetailItem = ({
  icon,
  label,
  value,
}: IWeatherDetailItemProps) => (
  <div className={styles.detailItem}>
    {icon}
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
