export const getUvIndexLevel = (uv: number): string => {
  switch (true) {
    case uv < 3:
      return "Low";
    case uv < 6:
      return "Moderate";
    case uv < 8:
      return "High";
    case uv < 11:
      return "Very High";
    default:
      return "Extreme";
  }
};

export const getWeatherConditionClass = (code: number): string => {
  const hundreds = Math.floor(code / 100);
  switch (hundreds) {
    case 2:
      return "thunderstorm";
    case 3:
    case 5:
      return "rain";
    case 6:
      return "snow";
    case 7:
      return "fog";
    case 8:
      return code === 800 ? "clear" : "cloudy";
    default:
      return "cloudy";
  }
};
