import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getWeather() {

    if (city === "") return;

    try {

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(response.data);

    } catch (error) {

      alert("City not found!");

    }
  }

  return (
    <div className="container">

      <div className="weather-card">

        <h1>🌦 Weather App</h1>

        <div className="search-box">

          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />

          <button onClick={getWeather}>
            Search
          </button>

        </div>

        {weather && (

          <div className="weather-info">

            <h2>{weather.name}</h2>

            <h3>{weather.main.temp} °C</h3>

            <p>☁️ Weather : {weather.weather[0].main}</p>

            <p>💧 Humidity : {weather.main.humidity}%</p>

            <p>💨 Wind Speed : {weather.wind.speed} km/h</p>

          </div>

        )}

      </div>

    </div>
  );
};

export default App;