import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, user, onSearch, onSearchSubmit, onLogout }) => {


  return (
    <Navbar expand="lg" className="bg-primary">
      <Navbar.Brand href="#" className='text-light'>
        <Link to={'/'} style={{ 'color': 'white', 'fontWeight': 'bold' }} >
          e-Shop
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {
            isLoggedIn ?
              (
                <div className='d-flex'>
                  <div className='m-2'>
                    <Link to={'/'} style={{ 'color': 'white', 'textDecoration': 'none', marginRight: "10px" }}>
                      <i className="fa fa-fw fa-home"></i> Home
                    </Link>
                    <Link to={`/cart/${user.id}`} style={{ 'color': 'white', 'textDecoration': 'none' }}>
                      <i className="fa fa-solid fa-cart-shopping"></i> Cart
                    </Link>
                  </div>
                  <Form onSubmit={onSearchSubmit} inline='true'>
                    <Row>
                      <Col xs="auto">
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          className=" mr-sm-2"
                          onInput={(e) => onSearch(e.target.value)}
                        />
                      </Col>
                      <Col xs="auto">
                        <Button type="submit" variant='success'>Submit</Button>
                      </Col>
                    </Row>
                  </Form>
                  <NavDropdown title={'Welcome, ' + user.firstName} id="basic-nav-dropdown" className='text-light'>
                    <NavDropdown.Item>
                      <Link to={`/profile/${user.id}`} className='text-dark'>Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to={`/cart/${user.id}`} className='text-dark'>Cart</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )
              :
              <>
                <Link href="#" to="/" className='text-light'>Login</Link>
              </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavBar;