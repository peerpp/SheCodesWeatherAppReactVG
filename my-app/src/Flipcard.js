import React from "react";

import "./flipcard.css";
import { getCountryName } from "./countrynames";

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function Flipcard(props) {
  let inputLocation = "Find your destination...";
  let temperature;
  let description = props.intro;
  let humidity;
  let icon = <i className="fas fa-search-location"></i>;
  let wind;
  let time = <span>&nbsp;</span>;
  let feelsLike;
  let buttonCardHidden = "btn btn-forecast btn-forecast-hidden buttonCard";
  let flip = "flip-card";
  let day1;
  let day2;
  let day3;
  let temp1;
  let temp2;
  let temp3;
  let feels1;
  let feels2;
  let feels3;
  let icon1;
  let icon2;
  let icon3;

  if (props.data) {
    // front
    let countryName = getCountryName(props.data.country);
    inputLocation = `${props.data.inputLocation}, ${countryName}`;

    let iconSrc = `https://openweathermap.org/img/wn/${props.data.icon}.png`;
    icon = <img className="iconCardFront" src={iconSrc} alt={description} />;

    temperature = <span>{props.data.temperature}°C &mdash;</span>;
    description = props.data.description;
    humidity = `Humidity: ${props.data.humidity}%`;
    wind = `Wind: ${props.data.wind} km/h`;
    time = formatUTCDate(props.data.time);
    feelsLike = `Feels like: ${props.data.feelsLike}°C`;
    buttonCardHidden = "btn btn-forecast buttonCard";

    if (props.data.flip) flip = "flip-card flip";

    // back
    day1 = props.data.day1;
    day2 = props.data.day2;
    day3 = props.data.day3;
    temp1 = props.data.temp1;
    temp2 = props.data.temp2;
    temp3 = props.data.temp3;
    feels1 = props.data.feels1;
    feels2 = props.data.feels2;
    feels3 = props.data.feels3;
    let icon1Src = `https://openweathermap.org/img/wn/${props.data.icon1}.png`;
    icon1 = (
      <img className="iconCardBack" src={icon1Src} alt={props.data.icon1alt} />
    );
    let icon2Src = `https://openweathermap.org/img/wn/${props.data.icon2}.png`;
    icon2 = (
      <img className="iconCardBack" src={icon2Src} alt={props.data.icon2alt} />
    );
    let icon3Src = `https://openweathermap.org/img/wn/${props.data.icon3}.png`;
    icon3 = (
      <img className="iconCardBack" src={icon3Src} alt={props.data.icon3alt} />
    );
  }

  function minutesTwoDigits(minutes) {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  }

  function formatUTCDate(date) {
    let day = days[date.getUTCDay()];
    let hours = date.getUTCHours();
    let minutes = minutesTwoDigits(date.getUTCMinutes());
    let month = months[date.getUTCMonth()];
    let numDay = date.getUTCDate();
    let year = date.getUTCFullYear();
    let ampm;
    if (hours >= 12) {
      ampm = "PM";
    } else {
      ampm = "AM";
    }
    if (hours > 12) {
      hours = hours - 12;
    } else if (hours === 0) {
      hours = 12;
    }
    return [
      `Last updated: ${day} ${month} ${numDay}, ${year} `,
      <i className="far fa-clock" key="clock"></i>,
      ` ${hours}:${minutes}${ampm}`,
    ];
  }

  return (
    <div className={flip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card-resultsHistory">
            <div className="card-body">
              <h5 className="card-title">{inputLocation}</h5>

              <h6 className="card-subtitle-card">
                <div className="row">
                  <div className="col-3">
                    {icon}
                    <br />
                  </div>
                  <div className="col-9">
                    {temperature}
                    <span className="descriptionWeather"> {description}</span>
                    <br />

                    <span className="moreDetailsTempCard">
                      {feelsLike}
                      <br />
                      {humidity}
                      <br />
                      {wind}
                    </span>
                  </div>
                </div>
              </h6>

              <button className={buttonCardHidden} onClick={props.onClick}>
                3 Days Forecast
              </button>
              <div className="timeCard">{time}</div>
            </div>
          </div>
        </div>

        <div className="flip-card-back">
          <div className="card card-forecastdays">
            <div className="card-body">
              <i className="far fa-window-close closeCard"></i>
              <h5 className="card-title">{inputLocation}</h5>

              <div className="container">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-3 dayTemperature">Day</div>
                  <div className="col-3 feelsLikeCold">Feels</div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3 forecastCard day1">{day1}</div>
                  <div className="col-3">{icon1}</div>
                  <div className="col-3 dayTemperature">
                    <span className="temp1">{temp1}</span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels1">{feels1}</span>°C
                  </div>
                </div>

                <div className="row">
                  <div className="col-3 forecastCard day2">{day2}</div>
                  <div className="col-3">{icon2}</div>
                  <div className="col-3 dayTemperature">
                    <span className="temp2">{temp2}</span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels2">{feels2}</span>°C
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 forecastCard day3">{day3}</div>
                  <div className="col-3">{icon3} </div>
                  <div className="col-3 dayTemperature">
                    <span className="temp3">{temp3}</span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels3">{feels3}</span>°C
                  </div>
                </div>
              </div>
              <div className="timeCard">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
