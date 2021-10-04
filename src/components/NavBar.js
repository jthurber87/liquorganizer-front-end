import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';


const NavBar = () => {
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/bottles">Liquorganizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />


      <Navbar.Collapse id="responsive-navbar-nav collasible-nav-dropdown">
        <Nav className="me-auto">
          <NavDropdown title="More" id="">
            <NavDropdown.Item href="/bottles/new">Add Bottle</NavDropdown.Item>

            <NavDropdown.Item href="#action/3.2">Another Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Another Action</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Login</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )}


export default NavBar
