import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _remove from 'lodash/remove';
import _isEmpty from 'lodash/isEmpty';
import _sumBy from 'lodash/sumBy';
import AddProductToQuotation from '../../../../components/Operations/Products/Product/AddProductToQuotation';
import AutoSuggest from '../../../../components/Operations/AutoSuggestion/AutoSuggest';
import { getCustomerSuggestions } from '../../../../components/Operations/AutoSuggestion/getCustomerSuggestions';
import getCustomerFormFields from '../../../../components/POJOs/Forms/AddCustomerForm';
import ToggleSwitch from '../../../../components/UI/ToggleSwitch/ToggleSwitch';
import Alert from '../../../../components/UI/Modal/Alert/Alert';
import BagDetails from '../../QuotationAndInvoice/BagDetails';
import { createQuotation } from '../../../../redux/actionTypes/actionTypes';
import { getCrrDate, getquotationExpiryDate } from '../../../../components/POJOs/GetCurrentDate';

import './CreateQuotation.css';

class CreateQuotation extends Component {
    state = {
        customerControls: getCustomerFormFields(),
        pageIdentifier: "selectorPage",
        disableInputs: true,
        quotation: {
            quotationID: '',
            customerID: '',
            products: [],
            subTotal: 0.00,
            gst: 0.00,
            grandTotal: 0.00,
            issueDate: null,
            expiryDate: null,
        },
        alert: {
            showAlert: false,
            alertMessage: ''
        },
    }

    /* getStateToUpdate = (stateObjStr) => {
        switch (stateObjStr) {
            case "customerControls":
                return this.state.customerControls;
            case "productControls":
                return this.state.productControls;
            default:
                return {}
        }
    }

    inputChangedHandler = (event, controlName, stateObjStr) => {
        const currState = this.getStateToUpdate(stateObjStr);
        const updatedControls = {
            ...currState,
            [controlName]: {
                ...currState[controlName],
                value: event.target.value,
                valid: true,
                touched: true
            }
        };
        switch (stateObjStr) {
            case "customerControls":
                this.setState({ customerControls: updatedControls });
                break;
            case "productControls":
                this.setState({ productControls: updatedControls });
                break;
            default:
                break;
        }
    } */

    toggleHandler = (toggled) => {
        this.setState({ disableInputs: !toggled });
    }

    selectedCustomerHandler = (id) => {
        const selectedCustomer = _find(this.props.customers, (customer) => customer._id === id)._id;
        const updatedQuotation = {
            ...this.state.quotation,
            customerID: selectedCustomer,
        };
        this.setState({ quotation: updatedQuotation });
    }

    getQuotationSubTotal = () => {
        const quotationSubTotal = _sumBy(this.state.quotation.products, (product) => parseFloat(product.totalPrice));
        return quotationSubTotal;
    }

    roundOfPrice = (value, decimals=2) => {
        // return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        return parseFloat(value).toFixed(decimals);
    }

    addToBagHandler = (productID, quantity, sellingPrice, name) => {
        const isProductInBag = _find(this.state.quotation.products, (product) => product.id === productID);
        if (isProductInBag) {
            const updatedQuotation = {
                ...this.state.quotation,
            };
            if (quantity === 0) {
                const updatedQuotation = {
                    ...this.state.quotation,
                };
                let updatedProducts = _remove(this.state.quotation.products, (product) => product.id === productID);
                updatedQuotation.products = updatedProducts;
                updatedQuotation.subTotal = this.roundOfPrice(this.getQuotationSubTotal(), 2);
                updatedQuotation.gst = this.roundOfPrice((updatedQuotation.subTotal * (18 / 100)), 2);
                updatedQuotation.grandTotal = this.roundOfPrice((parseFloat(updatedQuotation.subTotal) + parseFloat(updatedQuotation.gst)), 2);
                this.setState({ quotation: updatedQuotation });
            } else {
                let index = _findIndex(updatedQuotation.products, { id: productID });
                updatedQuotation.products.splice(index, 1, {
                    id: productID,
                    quantity,
                    name,
                    sellingPrice: this.roundOfPrice(sellingPrice, 2),
                    totalPrice: this.roundOfPrice((quantity * sellingPrice), 2),
                });
            }
            updatedQuotation.subTotal = this.roundOfPrice(this.getQuotationSubTotal(), 2);
            updatedQuotation.gst = this.roundOfPrice((updatedQuotation.subTotal * (18 / 100)), 2);
            updatedQuotation.grandTotal = this.roundOfPrice((parseFloat(updatedQuotation.subTotal) + parseFloat(updatedQuotation.gst)), 2);
            this.setState({ quotation: updatedQuotation });
        } else if (quantity !== 0) {
            const updatedQuotation = {
                ...this.state.quotation,
            };
            updatedQuotation.products.push({
                id: productID,
                quantity,
                name,
                sellingPrice: this.roundOfPrice(sellingPrice, 2),
                totalPrice: this.roundOfPrice((quantity * sellingPrice), 2),
            });
            updatedQuotation.subTotal = this.roundOfPrice(this.getQuotationSubTotal(), 2);
            updatedQuotation.gst = this.roundOfPrice((updatedQuotation.subTotal * (18 / 100)), 2);
            updatedQuotation.grandTotal = this.roundOfPrice((parseFloat(updatedQuotation.subTotal) + parseFloat(updatedQuotation.gst)), 2);
            this.setState({ quotation: updatedQuotation });
        }
    }
    resetAlert = () => {
        const updatedAlert = {
            ...this.state.alert,
        };
        updatedAlert.showAlert = false;
        updatedAlert.alertMessage = '';
        this.setState({ alert: updatedAlert });
    }
    createQuotationHandler = () => {
        if (_isEmpty(this.state.quotation.customerID)) {
            const updatedAlert = {
                ...this.state.alert,
            };
            updatedAlert.showAlert = true;
            updatedAlert.alertMessage = 'Please Select a Customer!';
            this.setState({ alert: updatedAlert });
        } else if (_isEmpty(this.state.quotation.products)) {
            const updatedAlert = {
                ...this.state.alert,
            };
            updatedAlert.showAlert = true;
            updatedAlert.alertMessage = 'Please Add Atleast One Product!';
            this.setState({ alert: updatedAlert });
        } else {
            const payload = {
                ...this.state.quotation,
                issueDate: getCrrDate(),
                expiryDate: getquotationExpiryDate(),
            }
            this.props.createQuotation(payload, this.props.history);
        }
    }

    render() {
        const { products } = this.props;
        // const selectCustomerView = formGenerator(this, "customerControls");
        const renderProducts = products.map(product => {
            return (
                <AddProductToQuotation key={product._id}
                    name={product.name}
                    id={product._id}
                    sellingprice={product.sellingprice}
                    addToBag={this.addToBagHandler}
                />
            );
        });
        const customerSuggestions = getCustomerSuggestions(this.props.customers);
        return (
            <React.Fragment>
                <Col lg={7} xs={12}>
                    <Row>
                        <Col lg={8} xs={6}>
                            <h3>Customer</h3>
                        </Col>
                        <Col lg={4} xs={6}>
                            <div align="right">
                                <ToggleSwitch
                                    toggleSwitch={this.toggleHandler}
                                    toggleLabel={'Add New'}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} xs={12}>
                            <AutoSuggest
                                suggestions={customerSuggestions}
                                placeHolder={'Search customer by name'}
                                onSelectionHandler={this.selectedCustomerHandler} />
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col xl="12" md="12" sm="12">
                            {selectCustomerView}
                            <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addCustomerQuotationPage" disabled={this.state.disableInputs} />
                        </Col>
                    </Row> */}
                    <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
                        <Col xs={4} lg={6}>
                            <h5>Product Name</h5>
                        </Col>
                        <Col xs={8} lg={6} style={{ display: 'flex' }}>
                            <Col xs={6} lg={6}>
                                <h5>Quantity</h5>
                            </Col>
                            <Col xs={6} lg={6}>
                                <h5>Selling Price</h5>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} xs={12}>
                            <ListGroup style={{ marginBottom: 5 }}>
                                {renderProducts}
                            </ListGroup>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5} xs={12}>
                    <BagDetails
                        customers={this.props.customers}
                        products={this.props.products}
                        selectedCustomerID={this.state.quotation.customerID}
                        selectedProducts={this.state.quotation.products}
                        subTotal={this.state.quotation.subTotal}
                        gst={this.state.quotation.gst}
                        grandTotal={this.state.quotation.grandTotal}
                        createQuotationBtnClick={this.createQuotationHandler}
                        parentOperation={'quotation'}
                    />
                </Col>
                {
                    this.state.alert.showAlert ?
                        <Alert
                            show={this.state.alert.showAlert}
                            resetFormValidity={this.resetAlert}
                            alertMsg={this.state.alert.alertMessage}
                        /> : null
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers,
    products: state.products,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createQuotation,
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateQuotation));