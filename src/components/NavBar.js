import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';


const NavBar = () => {
  return (
    <div className="navy">

    <Navbar collapseOnSelect expand="lg left" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/bottles">
        <img src="https://static.thenounproject.com/png/200345-200.png" class="navbot" />Liquorganizer </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />


          <Navbar.Collapse id="responsive-navbar-nav collasible-nav-dropdown">
            <Nav className="me-auto">
              <NavDropdown title="More" id="">
                <NavDropdown.Item href="/bottles/new">Add A Bottle</NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">Another Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Another Action</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link eventKey={2} href="/logout">
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}


export default NavBar
