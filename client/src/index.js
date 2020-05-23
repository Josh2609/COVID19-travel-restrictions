//import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { HashRouter } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";


import MapChart from "./MapChart";

function Map() {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Map />
    </HashRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
