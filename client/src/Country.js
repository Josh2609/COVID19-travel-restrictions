import React, { Component } from "react";
import axios from 'axios';
import ReactMarkdown from "react-markdown";

class Country extends Component {
  state = {
    country: [],
  }

  componentDidUpdate() {
    var pathArr = this.props.location.pathname.split("/");
    if (this.state.country != pathArr[2]) {
      var querty = "http://192.168.1.225:5000/api/country/" + pathArr[2]
      axios.get(querty)
        .then(res => {
          const restrictionFCO = res.data.data.restrictions.fco.description
          const country = res.data.data.linkName;
          this.setState({ restrictionFCO, country });
        })
        .catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    var path = this.props.location.pathname;
    var pathArr = path.split("/");
    var querty = "http://192.168.1.225:5000/api/country/" + pathArr[2]
    axios.get(querty)
      .then(res => {
        const restrictionFCO = res.data.data.restrictions.fco.description
        const country = res.data.data.linkName;
        this.setState({ restrictionFCO, country });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.restrictionFCO }} />
      </div>
    );
  }
}

export default Country;