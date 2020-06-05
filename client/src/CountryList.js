import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Table from 'react-bootstrap/Table'


class CountryList extends Component {

  state = {
    countries: [],
    persons: [],
  }

  componentDidMount() {
    axios.get(`http://192.168.1.225:5000/api/country`)
      .then(res => {
        const countries = res.data.countries;
        this.setState({ countries });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Country</th>
              <th>Entry Restrictions</th>
              <th>Transit Restrictions</th>
              <th>Quarantine Required</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.countries.map((country, i) => {
                var route = "/country/" + country.linkName
                return (
                  <tr key={i}>
                    <th><NavLink to={route} >{country.name}</NavLink></th>
                    <th>{country.restrictions.entry ? "Yes" : "No"}</th>
                    <th>{country.restrictions.transit ? "Yes" : "No"}</th>
                    <th>{country.restrictions.quarantine ? "Yes" : "No"}</th>
                  </tr>
                );

              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CountryList;
