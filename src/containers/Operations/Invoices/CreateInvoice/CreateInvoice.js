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
import AddProductToInvoice from '../../../../components/Operations/Products/Product/AddProductToInvoice';
import AutoSuggest from '../../../../components/Operations/AutoSuggestion/AutoSuggest';
import { getCustomerSuggestions } from '../../../../components/Operations/AutoSuggestion/getCustomerSuggestions';
import getCustomerFormFields from '../../../../components/POJOs/Forms/AddCustomerForm';
import ToggleSwitch from '../../../../components/UI/ToggleSwitch/ToggleSwitch';
import Alert from '../../../../components/UI/Modal/Alert/Alert';
import BagDetails from '../../QuotationAndInvoice/BagDetails';
import { createInvoice } from '../../../../redux/actionTypes/actionTypes';
import { getCrrDate } from '../../../../components/POJOs/GetCurrentDate';

import './CreateInvoice.css';

class CreateInvoice extends Component {
    state = {
        customerControls: getCustomerFormFields(),
        pageIdentifier: "selectorPage",
        disableInputs: true,
        invoice: {
            quotationID: '',
            customerID: '',
            products: [],
            subTotal: 0.00,
            gst: 0.00,
            grandTotal: 0.00,
            date: null,
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
        const updatedInvoice = {
            ...this.state.invoice,
            customerID: selectedCustomer,
        };
        this.setState({ invoice: updatedInvoice });
    }

    getInvoiceSubTotal = () => {
        const invoiceSubTotal = _sumBy(this.state.invoice.products, (product) => parseFloat(product.totalPrice));
        return invoiceSubTotal;
    }

    roundOfPrice = (value, decimals=2) => {
        // return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        return parseFloat(value).toFixed(decimals);
    }

    addToBagHandler = (productID, quantity, sellingPrice, name) => {
        console.log(name);
        const isProductInBag = _find(this.state.invoice.products, (product) => product.id === productID);
        if (isProductInBag) {
            const updatedInvoice = {
                ...this.state.invoice,
            };
            if (quantity === 0) {
                const updatedInvoice = {
                    ...this.state.invoice,
                };
                let updatedProducts = _remove(this.state.invoice.products, (product) => product.id === productID);
                updatedInvoice.products = updatedProducts;
                updatedInvoice.subTotal = this.roundOfPrice(this.getInvoiceSubTotal(), 2);
                updatedInvoice.gst = this.roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
                updatedInvoice.grandTotal = this.roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
                this.setState({ invoice: updatedInvoice });
            } else {
                let index = _findIndex(updatedInvoice.products, { id: productID });
                updatedInvoice.products.splice(index, 1, {
                    id: productID,
                    quantity,
                    name,
                    sellingPrice: this.roundOfPrice(sellingPrice, 2),
                    totalPrice: this.roundOfPrice((quantity * sellingPrice), 2),
                });
            }
            updatedInvoice.subTotal = this.roundOfPrice(this.getInvoiceSubTotal(), 2);
            updatedInvoice.gst = this.roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
            updatedInvoice.grandTotal = this.roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
            this.setState({ invoice: updatedInvoice });
        } else if (quantity !== 0) {
            const updatedInvoice = {
                ...this.state.invoice,
            };
            updatedInvoice.products.push({
                id: productID,
                quantity,
                name,
                sellingPrice: this.roundOfPrice(sellingPrice, 2),
                totalPrice: this.roundOfPrice((quantity * sellingPrice), 2),
            });
            updatedInvoice.subTotal = this.roundOfPrice(this.getInvoiceSubTotal(), 2);
            updatedInvoice.gst = this.roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
            updatedInvoice.grandTotal = this.roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
            this.setState({ invoice: updatedInvoice });
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
    createInvoiceHandler = () => {
        if (_isEmpty(this.state.invoice.customerID)) {
            const updatedAlert = {
                ...this.state.alert,
            };
            updatedAlert.showAlert = true;
            updatedAlert.alertMessage = 'Please Select a Customer!';
            this.setState({ alert: updatedAlert });
        } else if (_isEmpty(this.state.invoice.products)) {
            const updatedAlert = {
                ...this.state.alert,
            };
            updatedAlert.showAlert = true;
            updatedAlert.alertMessage = 'Please Add Atleast One Product!';
            this.setState({ alert: updatedAlert });
        } else {
            const payload = {
                ...this.state.invoice,
                date: getCrrDate()
            }
            console.log(payload);
            this.props.createInvoice(payload, this.props.history);
        }
    }

    render() {
        const { products } = this.props;
        // const selectCustomerView = formGenerator(this, "customerControls");
        const renderProducts = products.map(product => {
            return (
                <AddProductToInvoice key={product._id}
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
                                selectedCustomerID={this.selectedCustomerHandler} />
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col xl="12" md="12" sm="12">
                            {selectCustomerView}
                            <Button btnType="submit" btnVarient="primary" size="sm" block={false} btnTxt="ADD" btnID="addCustomerInvoicePage" disabled={this.state.disableInputs} />
                        </Col>
                    </Row> */}
                    <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
                        <Col xs={4} lg={7}>
                            <h5>Product Name</h5>
                        </Col>
                        <Col xs={8} lg={5} style={{ display: 'flex' }}>
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
                        selectedCustomerID={this.state.invoice.customerID}
                        selectedProducts={this.state.invoice.products}
                        subTotal={this.state.invoice.subTotal}
                        gst={this.state.invoice.gst}
                        grandTotal={this.state.invoice.grandTotal}
                        createInvoiceBtnClick={this.createInvoiceHandler}
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
        createInvoice,
    }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateInvoice));