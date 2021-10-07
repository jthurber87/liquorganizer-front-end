import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';


const NavBar = () => {
  return(
    <div className="navy">
    <Navbar fixed="top" collapseOnSelect expand="lg left" bg="dark" variant="dark" className="navbar">
      <Container>
      <Navbar.Brand href="/bottles">
        <img src="https://static.thenounproject.com/png/200345-200.png" class="navbot" />    Liquorganizer </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />


      <Navbar.Collapse id="responsive-navbar-nav collasible-nav-dropdown">
        <Nav className="me-auto">
          <NavDropdown title="More" id="">
            <NavDropdown.Item href="/bottles/new">Add A Bottle</NavDropdown.Item>

            <NavDropdown.Item href="/aboutus">Meet the Devs</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/auth/login">Login</Nav.Link>
          <Nav.Link eventKey={2} href="/auth/logout">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )}


export default NavBar
