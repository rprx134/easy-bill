import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from '../../../UI/BootstrapUI/Buttons/Button';
import Quotations from '../../../../containers/Operations/Quotations/Quotations';
import CreateQuotation from '../../../../containers/Operations/Quotations/CreateQuotation/CreateQuotation';
import { Switch, Route, } from 'react-router-dom';

import './QuotationDashboard.css';

const quotationDashboard = (props) => {
    const createNewHandler = () => {
        props.history.push("/dashboard/quotation/createQuotation/");
    }
    const createQuotationBtnStyle = {
        marginTop: 8,
        marginBottom: 8,
    };
    return (
        <div className="QuotationDashboard">
            <Row>
                <Button
                    btnVarient="outline-dark ml-auto mr-3"
                    btnSize="sm" block={false}
                    btnType="button"
                    btnID="createNewQuotation"
                    btnOnClick={createNewHandler}
                    btnTxt="Create Quotation"
                    style={createQuotationBtnStyle}/>
            </Row>
            <Row>
                <Switch>
                    <Route
                        key="quotation"
                        exact path="/dashboard/quotation/"
                        component={Quotations}
                    />
                    <Route
                        key="createQuotation"
                        exact path="/dashboard/quotation/createQuotation/"
                        component={CreateQuotation}
                    />
                </Switch>
            </Row>
        </div>
    );
}

export default quotationDashboard;