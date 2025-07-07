import "./App.css";
import { MainNav } from "./common/components/MainNav/MainNav";
import { SearchBar } from "./features/weather/components/SearchBar/SearchBar";
import { WeatherContainer } from "./features/weather/components/WeatherContainer/WeatherContainer";

function App() {
  return (
    <div className="app">
      <MainNav />
      <SearchBar />
      <WeatherContainer />
    </div>
  );
}

export default App;
