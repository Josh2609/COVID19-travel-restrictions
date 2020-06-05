import React, { Component } from "react";
import { Form, Container, FormControl, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import axios from 'axios';


class Update extends Component {
  constructor() {
    super()
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
       input: '# This is a header\n\nAnd this is a paragraph'
    }
  }

  handleMarkdownChange(evt) {
    this.setState({input: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    alert(this.state.input)
    const formData = new FormData(evt.target);
    const data = JSON.stringify(Object.fromEntries(formData));

    axios({
        method: 'post',
        url: 'http://192.168.1.225:5000/api/update/',
        headers: {'Content-Type': 'application/json' },
        data
        })
  }


  render() {
    return (
      <div>
        <Container>
          <h1>Update</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="update">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control name="text" as="textarea" rows="5" value={this.state.input} onChange={this.handleMarkdownChange}/>
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