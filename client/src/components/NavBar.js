import React from 'react';
import { Navbar, Nav, Form, NavItem } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Search from "./Search";


function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">TravelBans.info</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/"><NavItem>Home</NavItem></Nav.Link>
          <Nav.Link as={NavLink} exact to="/update"><NavItem>Update</NavItem></Nav.Link>
          <Nav.Link as={NavLink} exact to="/create"><NavItem>Create</NavItem></Nav.Link>
          <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
        </Nav>
        <Form inline>
          <Search />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;