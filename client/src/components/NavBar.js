import React from 'react';
import { Navbar, Nav, Form, NavItem } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Search from "./Search";


function NavBar() {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">TravelBans.info</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} eventKey="1" exact to="/"><NavItem>Home</NavItem></Nav.Link>
          <Nav.Link as={NavLink} eventKey="2" exact to="/update"><NavItem>Update</NavItem></Nav.Link>
          <Nav.Link as={NavLink} eventKey="3" exact to="/create"><NavItem>Create</NavItem></Nav.Link>
          <Nav.Link as={NavLink} eventKey="4" to="/about">About Us</Nav.Link>
        </Nav>
        <Form inline>
          <Search />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;