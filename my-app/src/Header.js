import React, { useState } from "react";
import "./header.css";
import Form from "./Form";
import axios from "axios";

const apiKey = "71f57c13bbcc4d290991410e3cd840b3";

export default function Header() {
  const [gpsLocation, setGpsLocation] = useState(false);
  const [gpsError, setGpsError] = useState(false);
  const [gpsAndDataLoaded, setGpsAndDataLoaded] = useState(false);
  const [headerWeather, setHeaderWeather] = useState(false);

  function temperatureSingapore(response) {
    setGpsAndDataLoaded(true);
    setHeaderWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
      wind: Math.round(response.data.wind.speed),
      userLocation: response.data.name
    })
    /*let temperatureElementSin = document.querySelector(".temperatureSingapore");
    let descriptionElementSin = document.querySelector("#descriptionSingapore");
    let humidityElementSin = document.querySelector("#humiditySingapore");
    let iconElementSin = document.querySelector("#iconSingapore");
    let windElementSin = document.querySelector("#windSingapore");
    let userLocationElement = document.querySelector("#userLocation");

    temperatureElementSin.innerHTML = Math.round(response.data.main.temp);
    descriptionElementSin.innerHTML = response.data.weather[0].description;
    humidityElementSin.innerHTML = response.data.main.humidity;
    iconElementSin.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
    iconElementSin.setAttribute("alt", response.data.weather[0].description);
    windElementSin.innerHTML = Math.round(response.data.wind.speed);
    userLocationElement.innerHTML = response.data.name;*/
  }

  function handlePosition(position) {
console.log("handlePos", gpsError, gpsLocation, gpsAndDataLoaded);
    setGpsLocation(position.coords);
  }

  function handleError() {
    setGpsError(true);
  }
 
  if (gpsAndDataLoaded) {
    return (
      <div className="Header">
        <h3>
          <span className="holiday">WeatherApp</span> For Your
          <span className="holiday"> Holiday</span> Destination
        </h3>

        <div className="row temperature">
          <div className="col-7 locationCurrent">
            <div id="userLocation">{headerWeather.userLocation}</div>
            <span className="temperatureSingapore">{headerWeather.temperature}</span>
            <a href=" " className="celsius disabled">
              °C
            </a>{" "}
            |
            <a href=" " className="fahrenheit disabled1">
              °F
            </a>
            <img id="iconSingapore" src={headerWeather.icon} alt={headerWeather.description} />
            <span className="descriptionWeather" id="descriptionSingapore">{headerWeather.description}</span>
          </div>
          <div className="col-5 rightLocation">
            <div className="timeSingapore">{headerWeather.wind}</div>
            Wind:
            <span id="windSingapore">{headerWeather.wind}</span> km/h &mdash; Humidity:
            <span id="humiditySingapore">{headerWeather.humidity}</span>%
          </div>
        </div>

        <Form />
      </div>
    )
  } else {
    if (gpsError) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric`;
      axios
        .get(`${apiUrl}&appid=${apiKey}`)
        .then(temperatureSingapore);
    } else if (gpsLocation) {
console.log("loading data", gpsError, gpsLocation, gpsAndDataLoaded)
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
      axios
        .get(`${apiUrl}&lat=${gpsLocation.latitude}&lon=${gpsLocation.longitude}&appid=${apiKey}`)
        .then(temperatureSingapore);
    } else {
console.log("loading gps", gpsError, gpsLocation, gpsAndDataLoaded)
      navigator.geolocation.getCurrentPosition(handlePosition, handleError);
    }

    return null
      // render page zonder Wind: Humidty: en zo
  }
}
