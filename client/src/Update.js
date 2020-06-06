import React, { Component } from "react";
import { Form, Container, Col, Button, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import Select from 'react-select'

class Update extends Component {
  constructor() {
    super()
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectCountryChange = this.handleSelectCountryChange.bind(this)
    this.state = {
      input: '# This is a header\n\nAnd this is a paragraph',
      countryList: [],
      selectedOption: null,
      country: {
        name: "",
        linkName: "",
        restrictions: {
        }
      }
    }
  }

  componentDidMount() {
    axios.get(`http://192.168.1.225:5000/api/country`)
      .then(res => {
        var countryList = [];
        const countries = res.data.countries;
        for (var country in countries) {
          countryList.push({ value: countries[country].linkName, label: countries[country].name })
          console.log(countries[country].name)
        }
        console.log(res.data)
        this.setState({ countryList });
      })
      .catch((err) => console.log(err));
  }

  handleMarkdownChange(evt) {
    this.setState({ input: evt.target.value })
  }

  handleSelectCountryChange(evt) {
    axios.get('http://192.168.1.225:5000/api/country/' + evt.value)
      .then(res => {
        this.setState({ input: res.data.data.restrictions.fco.description })
        this.setState({country: res.data.data})
        alert(JSON.stringify(res.data.data.restrictions.fco.description))

      })
    //alert(JSON.stringify(evt.value))
  }

  handleSubmit(evt) {
    evt.preventDefault()
    alert(this.state.input)
    const formData = new FormData(evt.target);
    const data = JSON.stringify(Object.fromEntries(formData));

    axios({
      method: 'post',
      url: 'http://192.168.1.225:5000/api/update/',
      headers: { 'Content-Type': 'application/json' },
      data
    })
  }
//(typeof variable !== 'undefined')

  render() {
    return (
      <div>
        <Container>
          <h1>Update</h1>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formCountrySelect">
              <Select onChange={this.handleSelectCountryChange} name="country" isClearable options={this.state.countryList} />
            </Form.Group>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="formEntryRadio">
                    <Form.Label>Entry Restrictions</Form.Label>
                    <Form.Check type="radio" name="entryRadio" checked={(typeof this.state.country.restrictions.entry !=='undefined') ? this.state.country.restrictions.entry ? true : false : false} id="entryRadioYes" label="Yes" />
                    <Form.Check type="radio" name="entryRadio" checked={(typeof this.state.country.restrictions.entry !=='undefined') ? this.state.country.restrictions.entry ? false : true : false} id="entryRadioNo" label="No" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formTransitRadio">
                    <Form.Label>Transit Restrictions</Form.Label>
                    <Form.Check type="radio" name="transitRadio" checked={(typeof this.state.country.restrictions.transit !=='undefined') ? this.state.country.restrictions.transit ? true : false : false} id="transitRadioYes" label="Yes" />
                    <Form.Check type="radio" name="transitRadio" checked={(typeof this.state.country.restrictions.transit !=='undefined') ? this.state.country.restrictions.transit ? false : true : false} id="transitRadioNo" label="No" />
                  </Form.Group>
                </Col>
                
                <Col>
                  <Form.Group controlId="formQuarantineRadio">
                    <Form.Label>Quarantine Required</Form.Label>
                    <Form.Check type="radio" name="quarantineRadio" checked={(typeof this.state.country.restrictions.quarantine !=='undefined') ? this.state.country.restrictions.quarantine ? true : false : false} id="quarantineRadioYes" label="Yes" />
                    <Form.Check type="radio" name="quarantineRadio" checked={(typeof this.state.country.restrictions.quarantine !=='undefined') ? this.state.country.restrictions.quarantine ? false : true : false} id="quarantineRadioNo" label="No" />
                  </Form.Group>
                </Col>
              </Row>

            </Container>
            <Form.Group controlId="formCountryRestrictions">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control name="text" as="textarea" rows="5" value={this.state.input} onChange={this.handleMarkdownChange} />
            </Form.Group>

            <Button variant="outline-success" type="submit">Submit</Button>
          </Form>
          <ReactMarkdown source={this.state.input} />
        </Container>
      </div>
    );
  }
}

export default Update;