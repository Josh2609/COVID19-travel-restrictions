import React from 'react';
import './App.css';
import axios from 'axios';


export default class App extends React.Component {
  state = {
    countries: [],
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/country`)
      .then(res => {
        const countries = res.data.countries;
        console.log(countries)
        this.setState({ countries });
      })
  }

  render() {
    return (
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
                return (
                  <tr key={i}>
                    <th>{country.name}</th>
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
      </div>
    )
  }
}

//export default App;
