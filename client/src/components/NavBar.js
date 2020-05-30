import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, NavItem } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to="/">restrictions.travel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} exact to="/"><NavItem>Home</NavItem></Nav.Link>
                    <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;