import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


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
    const data = []
    this.state.countries.map((country, i) => {
      var route = "/country/" + country.linkName
      data[i] = 
        { 
          name: <NavLink to={route} >{country.name}</NavLink>,
          entry: country.restrictions.entry ? "Yes" : "No",
          transit: country.restrictions.transit ? "Yes" : "No",
          quarantine: country.restrictions.quarantine ? "Yes" : "No"
        }
    })
    const columns = [{
      dataField: 'name',
      text: 'Country',
      sort: true
    }, {
      dataField: 'entry',
      text: 'Entry Restrictions',
      sort: true
    }, {
      dataField: 'transit',
      text: 'Transit Restrictions',
      sort: true
    }, {
      dataField: 'quarantine',
      text: 'Quarantine Required',
      sort: true
    }];
    
    
    return (
      <div>
        <BootstrapTable striped bordered hover responsive keyField='id' data={ data } columns={ columns } />
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
