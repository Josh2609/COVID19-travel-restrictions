import React, { Component } from "react";
import { Form, Container, Col, Button, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';

class Create extends Component {
  constructor() {
    super()
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      input: '# This is a header\n\nAnd this is a paragraph',
    }
  }

  handleMarkdownChange(evt) {
    this.setState({ input: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    alert(this.state.input)
    const formData = new FormData(evt.target);
    const data = JSON.stringify(Object.fromEntries(formData));

    axios({
      method: 'post',
      url: 'http://192.168.1.225:5000/api/create/',
      headers: { 'Content-Type': 'application/json' },
      data
    })
  }


  render() {
    return (
      <div>
        <Container>
          <h1>Create</h1>
          <Form onSubmit={this.handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="formCountryName">
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter country" name="country" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formIso3">
                    <Form.Label>ISO3 Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter ISO3" name="iso3" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formEntryRadio">
                    <Form.Label>Entry Restrictions</Form.Label>
                    <Form.Check type="radio" name="entryRadio" value="true" id="entryRadioYes" label="Yes" />
                    <Form.Check type="radio" name="entryRadio" value="false" id="entryRadioNo" label="No" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formTransitRadio">
                    <Form.Label>Transit Restrictions</Form.Label>
                    <Form.Check type="radio" name="transitRadio" value="true" id="transitRadioYes" label="Yes" />
                    <Form.Check type="radio" name="transitRadio" value="false" id="transitRadioNo" label="No" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formQuarantineRadio">
                    <Form.Label>Quarantine Required</Form.Label>
                    <Form.Check type="radio" name="quarantineRadio" value="true" id="quarantineRadioYes" label="Yes" />
                    <Form.Check type="radio" name="quarantineRadio" value="false" id="quarantineRadioNo" label="No" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="levelSelect">
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select" name="levelSelect">
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
      </div >
    );
  }
}

export default Create;