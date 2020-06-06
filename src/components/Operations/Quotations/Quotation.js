import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from '../../UI/BootstrapUI/Buttons/Button';
import './Quotation.css';

const quotation = (props) => {
    const downloadBtnStyle = {
        padding: 0,
    };
    return (
        <div className='Quotation'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Quotation ID: {props.id}</Card.Title>
                    <Card.Text>
                        Customer Name: {props.selectedCustomer.name}
                    </Card.Text>
                    <Card.Text>
                        Quotation Total: Rs. {props.grandTotal}
                    </Card.Text>
                    <Button
                        btnVarient={'link'}
                        btnSize={'sm'}
                        block={false}
                        btnType={'button'}
                        btnID={'download'}
                        btnOnClick={() => props.downloadAsDoc(props.id)}
                        disabled={false}
                        btnTxt={'Download'}
                        style={downloadBtnStyle}
                    />
                </Card.Body>
            </Card>
        </div>
    );
}

export default quotation;