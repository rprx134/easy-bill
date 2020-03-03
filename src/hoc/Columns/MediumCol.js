import React from 'react';
import Col from 'react-bootstrap/Col';

const mediumCol = (props) => {
    return (
        <Col xl="6" md="8" sm="8">
            {props.children}
        </Col>
    );
}

export default mediumCol;