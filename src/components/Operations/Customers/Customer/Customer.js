import React from 'react';
import Card from 'react-bootstrap/Card';
import './Customer.css';

const customer = (props) => {
    return (
        <div className='Customer'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    {props.gstin ? <Card.Subtitle className="mb-2 text-muted">GSTIN: {props.gstin}</Card.Subtitle> : null}
                    {props.email ? <Card.Text>
                        Email: {props.email}
                    </Card.Text> : null}
                    <Card.Text>
                        Mobile: {props.mobile}
                    </Card.Text>
                </Card.Body>
                <footer>
                    <Card.Link href="#">edit</Card.Link>
                    <Card.Link href="#">delete</Card.Link>
                </footer>
            </Card>
        </div>
    );
}

export default customer;