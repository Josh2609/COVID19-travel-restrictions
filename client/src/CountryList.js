import React, { Component } from "react";
import axios from 'axios';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Country from './Country';


class CountryList extends Component {

  state = {
    countries: [],
    persons: [],
  }

  componentDidMount() {
    axios.get(`http://192.168.1.225:5000/api/country`)
      .then(res => {
        const countries = res.data.countries;
        console.log(countries)
        this.setState({ countries });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <HashRouter>
        <div>
          <input type="text" name="search"></input>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Entry Restrictions</th>
                <th>Exit Restrictions</th>
                <th>Transit Restrictions</th>
                <th>Quarantine Required</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.countries.map((country, i) => {
                  var route = "/country/" + country.name
                  return (
                    <tr key={i}>
                      <th><NavLink to={route} >{country.name}</NavLink></th>
                      <th>{country.entryRestrictions ? "Yes" : "No"}</th>
                      <th>{country.exitRestrictions ? "Yes" : "No"}</th>
                      <th>{country.transitRestrictions ? "Yes" : "No"}</th>
                      <th>{country.quarantineRequired ? "Yes" : "No"}</th>
                    </tr>
                  );

                })
              }
            </tbody>
          </table>

          <div className="content">

            <Route exact path="/country/:countryName" component={Country} />

          </div>
        </div>
      </HashRouter>
    );
  }
}

export default CountryList;
