import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";


import "./Body.css";
import Header from "./Header";
import Flipcard from "./Flipcard";
import Footer from "./Footer";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <br />
    <div className="container2">
      <div className="row">
        <div className="col-6">
          <Flipcard />
        </div>
        <div className="col-6">
          <Flipcard />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <Flipcard />
        </div>
        <div className="col-6">
          <Flipcard />
        </div>
      </div>
    </div>

    <br />

    <Footer />
  </React.StrictMode>,
  rootElement
);
