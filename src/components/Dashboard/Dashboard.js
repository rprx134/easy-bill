import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Products from '../../containers/Operations/Products/Products';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


class Navigation extends Component {
    render() {
        return (
            <BrowserRouter>

                <Navbar bg="dark" variant="dark" sticky="top" expand="lg" >
                    <Navbar.Brand as={Link} to="/dashboard" >Easy Bill</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/dashboard/products/">Products</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/invoice/">Invoice</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/customers/">Customers</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/Franchise/">Franchise</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid>
                    <Row>
                        <Col xl="2" md="2" sm="6">
                            <h5>Filter By</h5>
                            <li>Filter 1</li>
                            <li>Filter 2</li>
                            <li>Filter 3</li>
                            <li>Filter 4</li>
                            <li>Filter 5</li>
                            <li>Filter 6</li>
                            <li>Filter 7</li>
                            <li>Filter 8</li>
                            <li>Filter 9</li>
                            <li>Filter 10</li>
                        </Col>
                        <Col xl="4" md="6" sm="8">
                            <Switch>
                                <Route exact path='/dashboard/products/' component={Products} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}

export default Navigation;