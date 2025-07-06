export const config = {
  port: process.env.PORT || 3001,
  weatherbitApiKey: process.env.WEATHERBIT_API_KEY || "",
};

if (!process.env.WEATHERBIT_API_KEY) {
  console.warn("Warning: WEATHERBIT_API_KEY is not set in .env file");
}
