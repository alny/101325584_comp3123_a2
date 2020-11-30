import React, { useState, useEffect } from "react";
import "./App.css";
import keys from "./keys";
import axios from "axios";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

const App = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const URL = `${api.base}weather?q=Toronto&APPID=${api.key}`;

      let response = await axios.get(URL);
      let data = response.data;
      setWeather(data);
      console.log("data:", data);
    };
    fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo.png" />
        <h2>GBC Weather App</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <p style={{ margin: "0px" }}>Current location:</p>
          <b style={{ marginLeft: "15px" }}>
            {weather && weather.name},{" "}
            {weather && weather.sys && weather.sys.country}
          </b>
        </div>

        <div
          style={{
            marginTop: "15px",
            width: "650px",
            height: "250px",
            backgroundColor: "#ccc",
            borderRadius: 4,
          }}
        >
          <p style={{ color: "#000", fontSize: "16px" }}>
            Current hourly report
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${
              weather &&
              weather.weather &&
              weather.weather.length !== 0 &&
              weather.weather[0].icon
            }@2x.png`}
          />
          <p style={{ color: "#000", fontSize: "16px", fontWeight: 600 }}>
            {weather &&
              weather.weather &&
              weather.weather.length !== 0 &&
              weather.weather[0].main}{" "}
            and {Math.round(weather.main.temp / 100)}°C
          </p>
          <p
            style={{
              color: "#000",
              fontSize: "16px",
              textTransform: "capitalize",
            }}
          >
            {weather &&
              weather.weather &&
              weather.weather.length !== 0 &&
              weather.weather[0].description}
          </p>
        </div>
      </header>
    </div>
  );
};

export default App;
