import React from 'react';
import Card from 'react-bootstrap/Card';
import './Customer.css';

const customer = (props) => {
    return (
        <div className='Customer'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">GSTIN: {props.gstin}</Card.Subtitle>
                    <Card.Text>
                        Email: {props.email}
                    </Card.Text>
                    <Card.Text>
                        Mobile: {props.mobile}
                    </Card.Text>
                    <Card.Link href="#">edit</Card.Link>
                    <Card.Link href="#">delete</Card.Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default customer;