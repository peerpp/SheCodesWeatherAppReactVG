import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

import "./Body.css";
import Header from "./Header";
import Flipcard from "./Flipcard";
import Footer from "./Footer";

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

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Header time={formatDate(now)} />
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
  </React.StrictMode>,
  rootElement
);
