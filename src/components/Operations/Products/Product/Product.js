import React from 'react';
import Card from 'react-bootstrap/Card';
import './Product.css';

const product = (props) => {
    return (
        <div className='Product'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Unit of measurement: {props.uom}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Unit price: {props.unitPrice} Rs.</Card.Subtitle>
                    <Card.Link href="#">edit</Card.Link>
                    <Card.Link href="#">delete</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default product;