import React, { Component } from "react";
import { Form, Container, Col, Button, Row, Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';
import Select from 'react-select'
import queryString from 'query-string';

class Update extends Component {
  constructor() {
    super()
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectCountryChange = this.handleSelectCountryChange.bind(this)
    this.handleEntryRadioChange = this.handleEntryRadioChange.bind(this)
    this.handleTransitRadioChange = this.handleTransitRadioChange.bind(this)
    this.handleQuarantineRadioChange = this.handleQuarantineRadioChange.bind(this)
    this.handleLevelSelectChange = this.handleLevelSelectChange.bind(this)

    this.state = {
      input: '# This is a header\n\nAnd this is a paragraph',
      countryList: [],
      selectedOption: null,
      entry: false,
      transit: false,
      quarantine: false,
      level: 0,
      country: {
        name: "",
        linkName: "",
        restrictions: {
          entry: false,
          transit: false,
          quarantine: false
          
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
        this.setState({input: res.data.data.restrictions.fco.description })
        this.setState({entry: res.data.data.restrictions.entry})
        this.setState({transit: res.data.data.restrictions.transit})
        this.setState({quarantine: res.data.data.restrictions.quarantine})
        this.setState({level: res.data.data.restrictions.level})
      })
      this.props.history.push("/update/" + evt.value)
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
    }).then(res => {
      if (res.status === 200)
      {
        window.scrollTo(0, 0)
        this.props.history.push("?success=true")
      } else 
      {
        window.scrollTo(0, 0)
        this.props.history.push("?success=false")
      }
    })
  }

handleEntryRadioChange(evt) { this.setState({entry: !this.state.entry}) }
handleTransitRadioChange(evt) { this.setState({transit: !this.state.transit}) }
handleQuarantineRadioChange(evt) { this.setState({quarantine: !this.state.quarantine}) }
handleLevelSelectChange(evt) { this.setState({level: evt.value}) }

  render() {
    var params = queryString.parse(this.props.location.search)
    console.log(params.success)
    return (
      <div>
        <Container>
        <Alert key="successAlert" show={params.success == "true"} variant="success">Update Successful</Alert>
        <Alert key="successAlert" show={params.success == "false"} variant="danger">Update Failed</Alert>  
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
                    <Form.Check type="radio" name="entryRadio" value="true" onChange={this.handleEntryRadioChange} checked={this.state.entry} id="entryRadioYes" label="Yes" />
                    <Form.Check type="radio" name="entryRadio" value="false" onChange={this.handleEntryRadioChange}  checked={!this.state.entry} id="entryRadioNo" label="No" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formTransitRadio">
                    <Form.Label>Transit Restrictions</Form.Label>
                    <Form.Check type="radio" name="transitRadio" value="true" onChange={this.handleTransitRadioChange} checked={this.state.transit} id="transitRadioYes" label="Yes" />
                    <Form.Check type="radio" name="transitRadio" value="false" onChange={this.handleTransitRadioChange} checked={!this.state.transit} id="transitRadioNo" label="No" />
                  </Form.Group>
                </Col>
                
                <Col>
                  <Form.Group controlId="formQuarantineRadio">
                    <Form.Label>Quarantine Required</Form.Label>
                    <Form.Check type="radio" name="quarantineRadio" value="true" onChange={this.handleQuarantineRadioChange} checked={this.state.quarantine} id="quarantineRadioYes" label="Yes" />
                    <Form.Check type="radio" name="quarantineRadio" value="false" onChange={this.handleQuarantineRadioChange} checked={!this.state.quarantine} id="quarantineRadioNo" label="No" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="levelSelect">
                    <Form.Label>Restriction Level</Form.Label>
                    <Form.Control as="select" value={this.state.level}  onChange={this.handleLevelSelectChange} name="levelSelect">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
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