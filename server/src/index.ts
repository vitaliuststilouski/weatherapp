import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import weatherRouter from "./api/weather.routes";
import { config } from "./config/env";

const app = express();
app.use(express.json());

app.use("/api/weather", weatherRouter);

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

console.log("API testKey:", process.env.OPENWEATHER_API_KEY);
