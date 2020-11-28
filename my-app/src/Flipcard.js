import React, { useState } from "react";
import axios from "axios";

import "./flipcard.css";

export default function Flipcard() {
  return (
    <div className="flip-card" id="flipCard1">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card-resultsHistory">
            <div className="card-body">
              <h5 className="card-title">
                <span className="cityCountryCard">
                  Find your destination...
                </span>
              </h5>

              <h6 className="card-subtitle-card">
                <div className="row">
                  <div className="col-3">
                    <span className="searchIcon">
                      <i className="fas fa-search-location"></i>
                    </span>
                    <br />
                  </div>
                  <div className="col-9">
                    <span className="temperatureFront"></span>
                    <span className="descriptionWeather descriptionCard">
                      Looking for a city-trip! Tokyo? Paris? Shanghai?
                    </span>
                    <br />

                    <span className="moreDetailsTempCard">
                      <span className="feelsLikeCard"></span>
                      <br />
                      <span className="humidityCard"></span>
                      <br />
                      <span className="windCard"></span>
                    </span>
                  </div>
                </div>
              </h6>

              <button className="btn btn-forecast btn-forecast-hidden buttonCard">
                3 Days Forecast
              </button>
              <div className="timeCard">&nbsp;</div>
            </div>
          </div>
        </div>

        <div className="flip-card-back">
          <div className="card card-forecastdays">
            <div className="card-body">
              <i className="far fa-window-close closeCard"></i>
              <h5 className="card-title">
                <span className="cityCountryCard"> </span>
              </h5>

              <div className="container">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-3 dayTemperature">Day</div>
                  <div className="col-3 feelsLikeCold">Feels</div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3 forecastCard day1"></div>
                  <div className="col-3">
                    <img src="" alt="" className="iconCardBack icon1" />
                  </div>
                  <div className="col-3 dayTemperature">
                    <span className="temp1"></span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels1"></span>°C
                  </div>
                </div>

                <div className="row">
                  <div className="col-3 forecastCard day2"></div>
                  <div className="col-3">
                    <img src="" alt="" className="iconCardBack icon2" />
                  </div>
                  <div className="col-3 dayTemperature">
                    <span className="temp2"></span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels2"></span>°C
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 forecastCard day3"></div>
                  <div className="col-3">
                    <img src="" alt="" className="iconCardBack icon3" />
                  </div>
                  <div className="col-3 dayTemperature">
                    <span className="temp3"></span>°C
                  </div>
                  <div className="col-3 feelsLikeCold">
                    <span className="feels3"></span>°C
                  </div>
                </div>
              </div>
              <div className="timeCard timeCard1">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
