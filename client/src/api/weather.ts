export const fetchWeather = async (city: string) => {
  const response = await fetch(`/api/weather/${city}`);
  return response.json();
};
