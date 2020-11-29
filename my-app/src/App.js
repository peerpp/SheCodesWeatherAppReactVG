import React, { useState } from "react";

import "./Body.css";
import Header from "./Header";
import Flipcard from "./Flipcard";
import Footer from "./Footer";

import axios from "axios";

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

export default function App() {
  let [formInput, setFormInput] = useState("");
  let [flipCards, setFlipCards] = useState({});

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

  function formatShortDate(date) {
    let day = days[date.getUTCDay()];
    let month = months[date.getUTCMonth()];
    let numDay = date.getUTCDate();
    return `${day} ${month} ${numDay}`;
  }

  async function displayCity(event) {
    event.preventDefault();

    let inputLocation = event.target[0].value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric&appid=${apiKey}`;
    let response1 = await axios
      .get(apiUrl)
      .catch((err) => setFormInput("Not found!"));

    let latitude = response1.data.coord.lat;
    let longitude = response1.data.coord.lon;
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    let response2 = await axios.get(apiUrl);

    showTemperature(response1, response2);
  }

  /*
  function displayCity2(event) {
    event.preventDefault();
    let inputLocation = event.target[0].value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&units=metric&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        showTemperature(response);
        return response;
      })
      .then((response) => getForecast3days(response))
      .catch((err) => {
        console.log(err);
        setFormInput("Not found!");
      });
  }
*/

  function formInputChange(event) {
    setFormInput(event.target.value);
  }

  function showTemperature(response1, response2) {
    setFlipCards({
      flipCard4: flipCards.flipCard3,
      flipCard3: flipCards.flipCard2,
      flipCard2: flipCards.flipCard1,
      flipCard1: {
        // front
        temperature: Math.round(response1.data.main.temp),
        description: response1.data.weather[0].description,
        humidity: response1.data.main.humidity,
        country: response1.data.sys.country,
        wind: Math.round(response1.data.wind.speed),
        time: new Date(
          response1.data.dt * 1000 + response1.data.timezone * 1000
        ),
        feelsLike: Math.round(response1.data.main.feels_like),
        inputLocation: formInput,
        icon: response1.data.weather[0].icon,
        flip: false,

        // back
        day1: formatShortDate(new Date(response2.data.daily[1].dt * 1000)),
        day2: formatShortDate(new Date(response2.data.daily[2].dt * 1000)),
        day3: formatShortDate(new Date(response2.data.daily[3].dt * 1000)),
        temp1: Math.round(response2.data.daily[1].temp.day),
        temp2: Math.round(response2.data.daily[2].temp.day),
        temp3: Math.round(response2.data.daily[3].temp.day),
        feels1: Math.round(response2.data.daily[1].feels_like.day),
        feels2: Math.round(response2.data.daily[2].feels_like.day),
        feels3: Math.round(response2.data.daily[3].feels_like.day),
        icon1: response2.data.daily[1].weather[0].icon,
        icon2: response2.data.daily[2].weather[0].icon,
        icon3: response2.data.daily[3].weather[0].icon,
        icon1alt: response2.data.daily[1].weather[0].description,
        icon2alt: response2.data.daily[2].weather[0].description,
        icon3alt: response2.data.daily[3].weather[0].description,
      },
    });
  }

  function flipCardClick(flipCardId) {
    let copy = Object.assign({}, flipCards);
    copy[flipCardId].flip = true;
    setFlipCards(copy);
  }

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
          <Flipcard
            intro="Looking For A City-Trip! Tokyo? Paris? Shanghai?"
            data={flipCards.flipCard1}
            onClick={() => flipCardClick("flipCard1")}
          />
        </div>
        <div className="col-6">
          <Flipcard
            intro="Looking For A Beach Holiday! Bali? Hue?"
            data={flipCards.flipCard2}
            onClick={() => flipCardClick("flipCard2")}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <Flipcard
            intro="Looking For A Cruise Trip! Sydney? Cuba? Penang?"
            data={flipCards.flipCard3}
            onClick={() => flipCardClick("flipCard3")}
          />
        </div>
        <div className="col-6">
          <Flipcard
            intro="Looking For A Road Trip! San Francisco? Auckland?"
            data={flipCards.flipCard4}
            onClick={() => flipCardClick("flipCard4")}
          />
        </div>
      </div>
      <br />

      <Footer />
    </div>
  );
}
