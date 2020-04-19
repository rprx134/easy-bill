import React from 'react';
import Card from 'react-bootstrap/Card';
import './Product.css';

const product = (props) => {
    return (
        <div className='Product'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Base Price: {props.baseprice} Rs.</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Selling Price: {props.sellingprice} Rs.</Card.Subtitle>
                    <Card.Link href="#">edit</Card.Link>
                    <Card.Link href="#">delete</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default product;