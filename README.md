# Weather App 🌦️

A modern weather application providing real-time weather data with city search and geolocation features.

deploy version:  https://weatherapp-1-f718.onrender.com/

**Change color based on weather**

 **Cloudy** <br/>
![pic1_optimized](https://github.com/user-attachments/assets/2ed0b155-ef97-41d1-b3ea-209b7c0f3438)

**Sunny**<br/>
 ![11photo_2025-07-07_16-48-36](https://github.com/user-attachments/assets/af37268c-cb94-4fde-a62a-4bd651432f86)

**Autocomplete first 10 cities(API limit)**<br/>
![autocomplet (2)](https://github.com/user-attachments/assets/3d698bc0-af96-4ff6-87f1-d6690bd0e43d)



## Features ✨

- 🔍 **City Search** with autocomplete
- 🌡️ **Current Weather Data** (temperature, humidity, wind speed, conditions)
- 📍 **Location-Based Weather** using device geolocation
- 📱 **Responsive Design** works on all devices

## Tech Stack 🛠️

**Frontend**:

- React + Redux + Vite
- TypeScript
- CSS Modules

**Backend**:

- Node.js + Express
- API calls

**APIs**:

- [Weatherbit.io](https://www.weatherbit.io/api/weather-current) - Weather data
- [Wirefreethought Geocoding](https://rapidapi.com/wirefreethought/api/) - City search

## API Endpoints 🔗

| Endpoint               | Method | Description              | Parameters                     |
| ---------------------- | ------ | ------------------------ | ------------------------------ |
| `/weather`             | GET    | Get weather by city name | `city` (string)                |
| `/cities`              | GET    | City search autocomplete | `query` (string)               |
| `/weather/coordinates` | GET    | Get weather by location  | `lat` (number), `lon` (number) |

## Installation 🚀

### Prerequisites

### Setup

1. **Clone repository**

   ```bash
   git clone git@github.com:vitaliuststilouski/weatherapp.git // SSH
   https://github.com/vitaliuststilouski/weatherapp.git // HTTPS
   ```

2. **Configure environment**  
   Create a `.env` file in the server directory:

   ```env
   WEATHERBIT_API_KEY=45d426a93cd14a85a7b986f02296d36e
   RAPIDAPI_KEY=7794ceb185msh24e2985100368e8p1f3e3djsn346fa747e663

   ```

3. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client && npm install

## Running the App ⚡

**Option 1: Run both frontend and backend together**

```bash
npm install // in client and server folder
npm run dev // in client and server folder
```

**Option 2: Run separately**
```bash
# Backend (port 3001)
npm run dev

# Frontend (port 5173)
cd client && npm run dev
```

**Option 2: Run separately**
```bash
# Backend (port 3001)
npm run dev

# Frontend (port 5173)
cd client && npm run dev

**Testing **
npm run test:watch

// if issues with testing please instal onne again in client
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest
```
