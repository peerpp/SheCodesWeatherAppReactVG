import React, { useState } from "react";
import "./header.css";
import Form from "./Form";
import axios from "axios";

const apiKey = "71f57c13bbcc4d290991410e3cd840b3";

export default function Header(props) {
  const [gpsLoaded, setGpsLoaded] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(false);
  const [gpsError, setGpsError] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [weather, setWeather] = useState(false);

  function converterCtoF(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  function converterFtoC(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  }

  function setFahrenheit(event) {
    event.preventDefault();
    setWeather({ ...weather, temperature: converterCtoF(weather.temperature) });

    let fahrenheitLink = document.querySelector(".fahrenheit");
    let celsiusLink = document.querySelector(".celsius");
    fahrenheitLink.classList.add("disabled");
    celsiusLink.classList.remove("disabled");
  }

  function setCelsius(event) {
    event.preventDefault();
    setWeather({ ...weather, temperature: converterFtoC(weather.temperature) });

    let fahrenheitLink = document.querySelector(".fahrenheit");
    let celsiusLink = document.querySelector(".celsius");
    fahrenheitLink.classList.remove("disabled");
    celsiusLink.classList.add("disabled");
  }

  function temperatureSingapore(response) {
    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      wind: Math.round(response.data.wind.speed),
      userLocation: response.data.name,
    });
  }

  function loadWeather() {
    if (gpsLocation) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${gpsLocation.latitude}&lon=${gpsLocation.longitude}&appid=${apiKey}`;
      axios.get(apiUrl).then(temperatureSingapore);
      setWeatherLoaded(true);
    } else if (gpsError) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric&appid=${apiKey}`;
      axios.get(apiUrl).then(temperatureSingapore);
      setWeatherLoaded(true);
    }
  }

  function handlePosition(position) {
    setGpsLocation(position.coords);
  }

  function handleError() {
    setGpsError(true);
  }

  if (gpsLoaded) {
    if (!weatherLoaded) loadWeather();
  } else {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    setGpsLoaded(true);
  }

  if (weatherLoaded) {
    return (
      <div className="Header">
        <h3>
          <span className="holiday">WeatherApp</span> For Your
          <span className="holiday"> Holiday</span> Destination
        </h3>

        <div className="row temperature">
          <div className="col-7 locationCurrent">
            <div>{weather.userLocation}</div>
            <span>{weather.temperature} </span>
            <a href=" " className="celsius disabled" onClick={setCelsius}>
              °C
            </a>{" "}
            |{" "}
            <a
              href=" "
              className="fahrenheit disabled1"
              onClick={setFahrenheit}
            >
              °F
            </a>
            <img
              id="iconSingapore"
              src={weather.icon}
              alt={weather.description}
            />
            <span className="descriptionWeather">{weather.description}</span>
          </div>
          <div className="col-5 rightLocation">
            <div>{props.time}</div>
            Wind: {weather.wind} km/h &mdash; Humidity: {weather.humidity}%
          </div>
        </div>
        <br />
        <Form />
      </div>
    );
  } else {
    return (
      <div className="Header">
        <h3>
          <span className="holiday">WeatherApp</span> For Your
          <span className="holiday"> Holiday</span> Destination
        </h3>
      </div>
    );
  }
}
