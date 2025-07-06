interface WeatherResponse {
  temp: number;
  description: string;
  city: string;
}

export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    const apiKey = process.env.WEATHERBIT_API_KEY;
    const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
      city
    )}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Weather API error");
    }

    if (!data.data || data.data.length === 0) {
      throw new Error("No weather data found");
    }

    const weather = data.data[0];

    return {
      temp: weather.temp,
      description: weather.weather.description,
      city: weather.city_name,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch weather: ${error.message}`);
  }
};
