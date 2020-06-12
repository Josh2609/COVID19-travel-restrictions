import React from 'react';
import './App.css';
import CountryList from './CountryList';
import { Route } from "react-router-dom";
import Country from "./Country"
import Update from "./Update"
import Create from "./Create"

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={CountryList} />
        <Route exact path="/country/:countryName" component={Country} />
        <Route path="/update/" component={Update} />
        <Route exact path="/create" component={Create} />
      </div>
    )
  }
}