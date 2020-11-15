import React from "react";
import "./header.css";
import Form from "./Form";

export default function Header() {
  return (
    <div className="Header">
      <h3>
        <span className="holiday">WeatherApp</span> For Your
        <span className="holiday"> Holiday</span> Destination
      </h3>

      <div className="row temperature">
        <div className="col-7 locationCurrent">
          <div id="userLocation">Singapore</div>
          <span className="temperatureSingapore"></span>
          <a href=" " className="celsius disabled">
            °C
          </a>{" "}
          |
          <a href=" " className="fahrenheit disabled1">
            °F
          </a>
          <img id="iconSingapore" src="" alt="" />
          <span className="descriptionWeather" id="descriptionSingapore"></span>
        </div>
        <div className="col-5 rightLocation">
          <div className="timeSingapore"></div>
          Wind:
          <span id="windSingapore"></span> km/h &mdash; Humidity:
          <span id="humiditySingapore"></span>%
        </div>
      </div>

      <Form />
    </div>
  );
}
