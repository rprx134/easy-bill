import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BagDetailsToggle from '../../../../containers/Operations/QuotationAndInvoice/BagDetailsToggle';

import './ProductToAdd.css';

const addProductToInvoice = (props) => {
    return (
        <ListGroup.Item style={{
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: '#F0F0F0'
        }}>
            <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
                <Col xs={4} lg={7}>
                    {props.name}
                </Col>
                <Col xs={8} lg={5} style={{ display: 'flex' }}>
                    <BagDetailsToggle
                        addToBag={props.addToBag}
                        id={props.id}
                        sellingprice={props.sellingprice}
                    />
                </Col>
            </Row>
        </ListGroup.Item >
    );
}

export default addProductToInvoice;