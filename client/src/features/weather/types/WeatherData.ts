export interface WeatherData {
  city_name: string;
  country_code: string;
  temp: number;
  app_temp: number;
  rh: number;
  wind_spd: number;
  wind_cdir_full: string;
  pres: number;
  sunrise: string;
  sunset: string;
  uv: number;
  ob_time: string;
  weather: {
    code: number;
    description: string;
    icon: string;
  };
}
