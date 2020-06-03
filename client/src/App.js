import React from 'react';
import './App.css';
import CountryList from './CountryList';
import Search from "./components/Search";


export default class App extends React.Component {

  render() {
    return (
      <div>
        <Search />
        <CountryList />
      </div>
    )
  }
}