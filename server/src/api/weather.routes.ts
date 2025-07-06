import express from "express";
import { fetchWeather } from "../services/weather.service";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const weatherData = await fetchWeather(req.params.city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
