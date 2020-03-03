import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Highlights from '../Operations/Highlights/Highlights';
import ProductsDashboard from '../Operations/Products/Dashboard/ProductsDashboard';
import CustomersDashboard from '../Operations/Customers/Dashboard/CustomersDashboard';
import { getCustomers } from '../../redux/actionTypes/actionTypes';

import './Dashboard.css';


class Navigation extends Component {

    componentDidMount() {
        this.props.getCustomers();
    }

    render() {
        return (
            <BrowserRouter>
                <Container fluid>
                    <Row>
                        <Col>
                            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
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
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            {/* <div className="sideNav">
                                <Navbar expand="lg">
                                    <Nav className="mr-auto flex-column">
                                        <Nav.Link as={Link} to="/dashboard/products/">Filter 1</Nav.Link>
                                        <Nav.Link as={Link} to="/dashboard/invoice/">Filter 2</Nav.Link>
                                        <Nav.Link as={Link} to="/dashboard/customers/">Filter 3</Nav.Link>
                                        <Nav.Link as={Link} to="/dashboard/Franchise/">Filter 4</Nav.Link>
                                    </Nav>
                                </Navbar>
                            </div> */}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Switch>
                                        <Route key="highlightsView" exact path='/dashboard/highlights/' component={Highlights} />
                                        <Route key="productDashboardView" path="/dashboard/products/" exact component={ProductsDashboard} />
                                        <Route key="addProductView" exact path="/dashboard/products/addnew/" component={ProductsDashboard} />
                                        <Route key="customerDashboardView" path="/dashboard/customers/" exact component={CustomersDashboard} />
                                        <Route key="addCustomerView" exact path="/dashboard/customers/addnew/" component={CustomersDashboard} />
                                    </Switch>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCustomers
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));