import * as https from "https";
import { URLSearchParams } from "url";
import { WeatherbitResponse, WeatherResponse } from "./iweather.service";

export class WeatherService {
  private static makeHttpsRequest(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(new Error("Failed to parse API response"));
            }
          });
        })
        .on("error", (error) => {
          reject(new Error(`API request failed: ${error.message}`));
        });
    });
  }

  static async searchCities(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!query || query.length < 3) {
        reject(new Error("Minimum 3 characters required"));
        return;
      }

      const params = new URLSearchParams({ namePrefix: query, limit: "10" });
      const options = {
        hostname: "wft-geo-db.p.rapidapi.com",
        path: `/v1/geo/cities?${params.toString()}`,
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY || "your-default-key-here",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.data || []);
          } catch (error) {
            reject(new Error("Failed to parse API response"));
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  }

  static async fetchWeather(city: string): Promise<WeatherResponse> {
    const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
      city
    )}&key=${process.env.WEATHERBIT_API_KEY}&include=minutely`;

    try {
      const response = await this.makeHttpsRequest(url);
      const { data } = response as WeatherbitResponse;

      if (!data?.length) {
        throw new Error("No weather data found");
      }

      return {
        city_name: data[0].city_name,
        country_code: data[0].country_code,
        temp: data[0].temp,
        app_temp: data[0].app_temp,
        rh: data[0].rh,
        wind_spd: data[0].wind_spd,
        wind_cdir_full: data[0].wind_cdir_full,
        pres: data[0].pres,
        sunrise: data[0].sunrise,
        sunset: data[0].sunset,
        uv: data[0].uv,
        ob_time: data[0].ob_time,
        weather: {
          code: data[0].weather.code,
          description: data[0].weather.description,
          icon: data[0].weather.icon,
        },
      };
    } catch (error) {
      throw new Error(
        `Weatherbit API error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async fetchWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherResponse> {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}&include=minutely`;

    try {
      const response = await this.makeHttpsRequest(url);
      const { data } = response as WeatherbitResponse;

      if (!data?.length) {
        throw new Error("No weather data found");
      }

      return {
        city_name: data[0].city_name,
        country_code: data[0].country_code,
        temp: data[0].temp,
        app_temp: data[0].app_temp,
        rh: data[0].rh,
        wind_spd: data[0].wind_spd,
        wind_cdir_full: data[0].wind_cdir_full,
        pres: data[0].pres,
        sunrise: data[0].sunrise,
        sunset: data[0].sunset,
        uv: data[0].uv,
        ob_time: data[0].ob_time,
        weather: {
          code: data[0].weather.code,
          description: data[0].weather.description,
          icon: data[0].weather.icon,
        },
      };
    } catch (error) {
      throw new Error(
        `Weatherbit API error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
