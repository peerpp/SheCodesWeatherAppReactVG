import React, { useState } from "react";

import "./Body.css";
import Header from "./Header";
import Flipcard from "./Flipcard";
import Footer from "./Footer";

import axios from "axios";

export default function App() {
  let [formInput, setFormInput] = useState("");

  const apiKey = "71f57c13bbcc4d290991410e3cd840b3";

  let now = new Date();
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

  function minutesTwoDigits(minutes) {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return minutes;
    }
  }

  function formatDate(date) {
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = minutesTwoDigits(date.getMinutes());
    let month = months[date.getMonth()];
    let numDay = date.getDate();
    let year = date.getFullYear();
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
      `${day} ${month} ${numDay}, ${year} `,
      <i className="far fa-clock" key="clock"></i>,
      ` ${hours}:${minutes}${ampm}`,
    ];
  }

  function displayCity(event) {
    event.preventDefault();
    let inputLocation = event.target[0].value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric`;
    axios
      .get(`${apiUrl}&appid=${apiKey}`)
      .then(showTemperature)
      .catch((err) => setFormInput("Not found!"));
  }

  function formInputChange(event) {
    setFormInput(event.target.value);
  }

  function showTemperature() {}

  return (
    <div>
      <Header
        time={formatDate(now)}
        formInput={formInput}
        formInputChange={formInputChange}
        onSubmit={displayCity}
      />
      <br />
      <div className="row">
        <div className="col-6">
          <Flipcard intro="Looking For A City-Trip! Tokyo? Paris? Shanghai?" />
        </div>
        <div className="col-6">
          <Flipcard intro="Looking For A Beach Holiday! Bali? Hue?" />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <Flipcard intro="Looking For A Cruise Trip! Sydney? Cuba? Penang?" />
        </div>
        <div className="col-6">
          <Flipcard intro="Looking For A Road Trip! San Francisco? Auckland?" />
        </div>
      </div>

      <br />

      <Footer />
    </div>
  );
}
