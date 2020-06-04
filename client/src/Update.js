import React, { Component } from "react";
import { Form, Container, FormControl, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'


class Update extends Component {
  constructor(props) {
    super(props)
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.state = {
       input: '# This is a header\n\nAnd this is a paragraph'
    }
  }

  handleMarkdownChange(evt) {
    this.setState({input: evt.target.value})
  }


  render() {
    return (
      <div>
        <Container>
          <h1>Update</h1>
          <Form>
            <Form.Group controlId="update">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows="5" value={this.state.input} onChange={this.handleMarkdownChange}/>
            </Form.Group>
            <Button variant="outline-success">Submit</Button>
          </Form>
          <ReactMarkdown source={this.state.input} />
        </Container>
      </div>
    );
  }
}

export default Update;