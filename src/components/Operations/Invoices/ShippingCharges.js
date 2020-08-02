import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputNumber from 'rc-input-number';

const ShippingCharges = (props) => {
    const [charges, setCharges] = useState(0.00);
    const valueOnChange = (value) => {
        if (!isNaN(value) && value >= 0) {
            setCharges(value);
            props.changed(value);
        }
    }
    return (
        <Row style={{ paddingLeft: 5, marginTop: 5, marginBottom: 5 }}>
            <Col xs={4} lg={6}>
                <h5>Shipping Charges</h5>
            </Col>
            <Col xs={8} lg={6} style={{ paddingLeft: 32}}>
                <InputNumber
                    aria-label="Shipping Charges"
                    min={0}
                    step={0.01}
                    style={{ width: 75 }}
                    value={charges}
                    onChange={valueOnChange}
                />
            </Col>
        </Row>
    );
}

export default ShippingCharges;