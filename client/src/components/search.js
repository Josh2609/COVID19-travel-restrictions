import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: '',
    };
  }

  render() {
    return (
      <div>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>

      </div>
    )
  }
}
export default Search;
