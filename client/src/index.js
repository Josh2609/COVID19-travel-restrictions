import './index.css';
import App from './App';
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'

import { HashRouter } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { Route, useLocation } from "react-router-dom";


import MapChart from "./MapChart";

function Map() {
  const [content, setContent] = useState("");
  if(useLocation().pathname === "/update") {
    return null;
  }
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
      <NavBar />
      <Container>
      <Route path="/" component={Map} />
        <App />
      </Container>
    </HashRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
