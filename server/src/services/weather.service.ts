import * as https from "https";
import { URLSearchParams } from "url";
import type { WeatherResponse } from "../types/geo";

export class WeatherService {
  static async searchCities(query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!query || query.length < 3) {
        reject(new Error("Minimum 3 characters required"));
        return;
      }

      const params = new URLSearchParams({ namePrefix: query, limit: "5" });
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
    )}&key=${process.env.WEATHERBIT_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Weatherbit API error");
    const { data } = await response.json();
    if (!data?.length) throw new Error("No weather data found");

    return {
      temp: data[0].temp,
      humidity: data[0].rh,
      description: data[0].weather.description,
      city: data[0].city_name,
    };
  }

  static async fetchWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<WeatherResponse> {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHERBIT_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Weatherbit API error");
    const { data } = await response.json();
    if (!data?.length) throw new Error("No weather data found");

    return {
      temp: data[0].temp,
      humidity: data[0].rh,
      description: data[0].weather.description,
      city: data[0].city_name,
    };
  }
}
