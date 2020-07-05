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
import _get from 'lodash/get';
import AddProductToInvoice from '../../../../components/Operations/Products/Product/AddProductToInvoice';
import getCustomerFormFields from '../../../../components/POJOs/Forms/AddCustomerForm';
import Alert from '../../../../components/UI/Modal/Alert/Alert';
import BagDetails from '../../QuotationAndInvoice/BagDetails';
import { createInvoice } from '../../../../redux/actionTypes/actionTypes';
import { getCrrDate } from '../../../../components/POJOs/GetCurrentDate';
import ChooseInvoiceByQuotation from '../../../../components/Operations/Invoices/ChooseInvoiceByQuotation';
import { getQuotationById } from '../../../../selectors/quotationSelectors';
import { roundOfPrice } from '../../../../components/POJOs/RoundOfPrice';

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
        quotationID: null,
    }

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

    addToBagHandler = (productID, quantity, sellingPrice, name) => {
        const isProductInBag = _find(this.state.invoice.products, (product) => product._id === productID);
        if (isProductInBag) {
            const updatedInvoice = {
                ...this.state.invoice,
            };
            if (quantity === 0) {
                const updatedInvoice = {
                    ...this.state.invoice,
                };
                let updatedProducts = _remove(this.state.invoice.products, (product) => product._id === productID);
                updatedInvoice.products = updatedProducts;
                updatedInvoice.subTotal = roundOfPrice(this.getInvoiceSubTotal(), 2);
                updatedInvoice.gst = roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
                updatedInvoice.grandTotal = roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
                this.setState({ invoice: updatedInvoice });
            } else {
                let index = _findIndex(updatedInvoice.products, { _id: productID });
                updatedInvoice.products.splice(index, 1, {
                    _id: productID,
                    quantity,
                    name,
                    sellingPrice: roundOfPrice(sellingPrice, 2),
                    totalPrice: roundOfPrice((quantity * sellingPrice), 2),
                });
            }
            updatedInvoice.subTotal = roundOfPrice(this.getInvoiceSubTotal(), 2);
            updatedInvoice.gst = roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
            updatedInvoice.grandTotal = roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
            this.setState({ invoice: updatedInvoice });
        } else if (quantity !== 0) {
            const updatedInvoice = {
                ...this.state.invoice,
            };
            updatedInvoice.products.push({
                _id: productID,
                quantity,
                name,
                sellingPrice: roundOfPrice(sellingPrice, 2),
                totalPrice: roundOfPrice((quantity * sellingPrice), 2),
            });
            updatedInvoice.subTotal = roundOfPrice(this.getInvoiceSubTotal(), 2);
            updatedInvoice.gst = roundOfPrice((updatedInvoice.subTotal * (18 / 100)), 2);
            updatedInvoice.grandTotal = roundOfPrice((parseFloat(updatedInvoice.subTotal) + parseFloat(updatedInvoice.gst)), 2);
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
            this.props.createInvoice(payload, this.props.history);
        }
    }

    getQuantityInBag = (id) => _get(_find(this.state.invoice.products, {'_id': id}), 'quantity', 0);

    getSellingPriceInBag = (id) => _get(_find(this.state.invoice.products, {'_id': id}), 'sellingPrice', 0);

    selectedQuotationHandler = (id) => {
        this.setState({quotationID: id});
        const quotation = getQuotationById(id);
        const quotationToInvoice = {
            ...quotation,
        };
        const UpdatedInvoice = {
            ...this.state.invoice,
            customerID: quotationToInvoice.customerID,
            quotationID: quotationToInvoice._id,
            products: quotationToInvoice.products,
            subTotal: quotationToInvoice.subTotal,
            gst: quotationToInvoice.gst,
            grandTotal: quotationToInvoice.grandTotal,
        };
        this.setState({invoice: UpdatedInvoice});
    }

    render() {
        const { products } = this.props;
        const renderProducts = products.map(product => {
            const quantityInBag = this.getQuantityInBag(product._id);
            const sellingPriceInBag = this.getSellingPriceInBag(product._id);
            return (
                <AddProductToInvoice key={product._id}
                    name={product.name}
                    id={product._id}
                    sellingprice={product.sellingprice}
                    addToBag={this.addToBagHandler}
                    quantityInBag={quantityInBag}
                    sellingPriceInBag={sellingPriceInBag}
                />
            );
        });
        return (
            <React.Fragment>
                {this.state.quotationID ?
                    <>
                        <Col lg={7} xs={12}>
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
                                selectedCustomerID={this.state.invoice.customerID}
                                selectedProducts={this.state.invoice.products}
                                subTotal={this.state.invoice.subTotal}
                                gst={this.state.invoice.gst}
                                grandTotal={this.state.invoice.grandTotal}
                                createInvoiceBtnClick={this.createInvoiceHandler}
                                parentOperation={'invoice'}
                            />
                        </Col>
                    </>
                    :
                    <Col lg={7} xs={12}>
                        <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
                            <h2>Select Quotation</h2>
                        </Row>
                        <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
                            <ChooseInvoiceByQuotation selectedQuotation={this.selectedQuotationHandler} />
                        </Row>
                    </Col>
                }

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