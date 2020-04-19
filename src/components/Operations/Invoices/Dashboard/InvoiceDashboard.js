import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from '../../../UI/BootstrapUI/Buttons/Button';
import Invoices from '../../../../containers/Operations/Invoices/Invoices';
import CreateInvoice from '../../../../containers/Operations/Invoices/CreateInvoice/CreateInvoice';
import { Switch, Route, } from 'react-router-dom';

import './InvoiceDashboard.css';

const invoiceDashboard = (props) => {
    const createNewHandler = () => {
        props.history.push("/dashboard/invoice/createInvoice/");
    }
    const createInvoiceBtnStyle = {
        marginTop: 8,
        marginBottom: 8,
    };
    return (
        <div className="InvoiceDashboard">
            <Row>
                <Button
                    btnVarient="outline-dark ml-auto mr-3"
                    btnSize="sm" block={false}
                    btnType="button"
                    btnID="createNewInvoice"
                    btnOnClick={createNewHandler}
                    btnTxt="Create Invoice"
                    style={createInvoiceBtnStyle}/>
            </Row>
            <Row>
                <Switch>
                    <Route
                        key="invoice"
                        exact path="/dashboard/invoice/"
                        component={Invoices}
                    />
                    <Route
                        key="createInvoice"
                        exact path="/dashboard/invoice/createInvoice/"
                        component={CreateInvoice}
                    />
                </Switch>
            </Row>
        </div>
    );
}

export default invoiceDashboard;