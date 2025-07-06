import express, { Request, Response } from "express";
import { WeatherService } from "../services/weather.service";

const router = express.Router();

router.get("/cities", async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const cities = await WeatherService.searchCities(query.toString());
    res.json(cities);
  } catch (error) {
    console.error("City search error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "City search failed",
    });
  }
});

router.get("/weather", async (req: Request, res: Response): Promise<any> => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City parameter required" });
    }
    const weather = await WeatherService.fetchWeather(city.toString());
    return res.json(weather);
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Weather fetch failed";
    return res.status(500).json({ error: err });
  }
});

router.get(
  "/weather/coordinates",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { lat, lon } = req.query;
      if (!lat || !lon) {
        return res.status(400).json({ error: "Both lat and lon required" });
      }
      const weather = await WeatherService.fetchWeatherByCoords(
        parseFloat(lat.toString()),
        parseFloat(lon.toString())
      );
      return res.json(weather);
    } catch (error: unknown) {
      const err =
        error instanceof Error ? error.message : "Weather fetch failed";
      return res.status(500).json({ error: err });
    }
  }
);

export default router;
