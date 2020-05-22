import React, { Component } from "react";
import axios from 'axios';

class Country extends Component {
    state = {
        countryData: [],
    }

    componentDidUpdate(prevProps, prevState)
    {
        var path = this.props.location.pathname;
        var res = path.split("/");
        console.log(res[2])
        if(this.state.countryData.name != res[2]) {
            var querty = "http://192.168.1.225:5000/api/country/"+res[2]
                axios.get(querty)
                  .then(res => {
                    const countryData = res.data.countryData;
                    console.log(countryData)
                    this.setState({ countryData });
                  })
                  .catch((err) => console.log(err));
            console.log("statye = " + JSON.stringify(this.state))
        }
        console.log(this.state == prevState ? "same state" : "Different state")
        console.log("prevState = " + JSON.stringify(prevState))
        console.log("thisState = " + JSON.stringify(this.state))

    }
    componentDidMount() {
        var path = this.props.location.pathname;
            var res = path.split("/");
            console.log(res[2])
            var querty = "http://192.168.1.225:5000/api/country/"+res[2]
                axios.get(querty)
                  .then(res => {
                    const countryData = res.data.countryData;
                    console.log(countryData)
                    this.setState({ countryData });
                  })
                  .catch((err) => console.log(err));
            console.log("statye = " + JSON.stringify(this.state))
    }

    render() {
        return (
            <div>
                <h2>{JSON.stringify(this.state)}</h2>
            </div>
        );
    }
}

export default Country;