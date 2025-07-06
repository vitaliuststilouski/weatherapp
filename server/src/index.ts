import { config } from "dotenv";
config();
import express from "express";
import weatherRouter from "./api/weather.routes";

config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api", weatherRouter);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("API testKey:", process.env.WEATHERBIT_API_KEY);
console.log("RAPIDAPI_KEY:", process.env.RAPIDAPI_KEY);
