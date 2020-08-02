import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../../../components/UI/BootstrapUI/Buttons/Button';
import { capitalizeFirstLetter } from '../../../components/POJOs/CapitalizeFirstLetter';
import { roundOfPrice } from '../../../components/POJOs/RoundOfPrice';
import '../QuotationAndInvoice/BagDetails.css';


const bagDetails = (props) => {
    let customerInfoToShow = '';
    const title = props.parentOperation;
    if (_isEmpty(props.selectedCustomerID)) {
        customerInfoToShow = 'Please select a customer!';
    } else {
        const customer = _find(props.customers, (customer) => { return customer._id === props.selectedCustomerID; });
        customerInfoToShow = customer.name + ', Mobile: ' + customer.mobile;
    }
    const subTotal = roundOfPrice(props.subTotal);
    const gst = roundOfPrice(props.gst);
    const shippingCharges = roundOfPrice(props.shippingCharges);
    const grandTotal = roundOfPrice(props.grandTotal);
    const renderSelectedProducts = props.selectedProducts.map(selectedProduct => {
        const totalPrice = roundOfPrice(selectedProduct.totalPrice);
        const productName = _find(props.products, (product) => product._id === selectedProduct._id).name;
        return (
            <ListGroup.Item style={{
                backgroundColor: '#D3D3D3',
            }} key={selectedProduct.id}>
                <Row>
                    <Col xs={4} lg={4}>
                        {productName}
                    </Col>
                    <Col xs={2} lg={2}>
                        x{selectedProduct.quantity}
                    </Col>
                    <Col xs={6} lg={6}>
                        <div align="right">
                            Rs. {totalPrice}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item >);
    });
    return (
        <Jumbotron>
            <Container>
                <h1>{capitalizeFirstLetter(title)} Details</h1>
                <p>
                    <strong>Customer: </strong>{customerInfoToShow}
                </p>
                <ListGroup variant="flush">
                    {renderSelectedProducts}
                </ListGroup>
                <Row style={{
                    paddingTop: 13,
                    paddingRight: 21,
                    paddingBottom: 0,
                    paddingLeft: 21
                }}>
                    <Col xs={6} lg={6}>
                        <p>Sub Total</p>
                    </Col>
                    <Col xs={6} lg={6}>
                        <div align="right">
                            Rs. {subTotal}
                        </div>
                    </Col>
                </Row>
                <hr style={{ margin: 0 }} />
                <Row style={{
                    paddingTop: 13,
                    paddingRight: 21,
                    paddingBottom: 0,
                    paddingLeft: 21
                }}>
                    <Col xs={6} lg={6}>
                        <p>GST (18%)</p>
                    </Col>
                    <Col xs={6} lg={6}>
                        <div align="right">
                            Rs. {gst}
                        </div>
                    </Col>
                </Row>
                <hr style={{ margin: 0 }} />
                <Row style={{
                    paddingTop: 13,
                    paddingRight: 21,
                    paddingBottom: 0,
                    paddingLeft: 21
                }}>
                    <Col xs={6} lg={6}>
                        <p>Shipping Charges</p>
                    </Col>
                    <Col xs={6} lg={6}>
                        <div align="right">
                            Rs. {shippingCharges}
                        </div>
                    </Col>
                </Row>
                <hr style={{ margin: 0 }} />
                <Row style={{
                    paddingTop: 13,
                    paddingRight: 21,
                    paddingBottom: 0,
                    paddingLeft: 21
                }}>
                    <Col xs={6} lg={6}>
                        <strong>Grand Total</strong>
                    </Col>
                    <Col xs={6} lg={6}>
                        <div align="right">
                            <strong>Rs. {grandTotal}</strong>
                        </div>
                    </Col>
                </Row>

                <Row style={{
                    paddingTop: 13,
                    paddingRight: 21,
                    paddingBottom: 0,
                    paddingLeft: 21
                }}>
                    <Button
                        variant={'primary'}
                        size={'lg'}
                        block={true}
                        type={'button'}
                        id={'createInvoiceBtn'}
                        btnOnClick={title === 'invoice' ? props.createInvoiceBtnClick : props.createQuotationBtnClick}
                        disabled={false}
                        btnTxt={'Create '.concat(capitalizeFirstLetter(title))}
                    />
                </Row>
            </Container>
        </Jumbotron >
    );
}

export default bagDetails;