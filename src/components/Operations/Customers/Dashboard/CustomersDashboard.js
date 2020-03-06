import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from '../../../UI/BootstrapUI/Buttons/Button';
import customers from '../../../../containers/Operations/Customers/Customers';
import AddCustomer from '../../../../containers/Operations/Customers/AddCustomers/AddCustomers';
import { Switch, Route } from 'react-router-dom';

import './CustomersDashboard.css';

const CustomersDashboard = (props) => {
    const addNewHandler = () => {
        props.history.push("/dashboard/customers/addnew/");
    }
    return (
        <div className="CustomersDashboard">
                <Row>
                    <Button btnVarient="outline-dark ml-auto mr-3" btnSize="sm" block={false} btnType="button" btnID="addNewCustomer" btnOnClick={addNewHandler} btnTxt="Add Customer" />
                </Row>
                <Row>
                    <Switch>
                        <Route
                            key="customers"
                            exact path="/dashboard/customers/"
                            component={customers}
                        />
                        <Route
                            key="addCustomer"
                            exact path="/dashboard/customers/addnew/"
                            component={AddCustomer}
                        />
                    </Switch>
                </Row>
        </div>
    );
}

export default CustomersDashboard;