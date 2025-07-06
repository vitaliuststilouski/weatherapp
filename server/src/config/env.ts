export const config = {
  port: process.env.PORT || 3001,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || "",
};

if (!process.env.OPENWEATHER_API_KEY) {
  console.warn("Warning: OPENWEATHER_API_KEY is not set in .env file");
}
