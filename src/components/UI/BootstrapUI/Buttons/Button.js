import React from 'react';
import { Button } from 'react-bootstrap';
import './Button.css';

const button = (props) => {
    return (
        <Button
            variant={props.btnVarient} 
            size={props.btnSize} 
            block={props.block} 
            type={props.btnType} 
            id={props.btnID} 
            onClick={props.btnOnClick} 
            disabled={props.disabled}
            style={props.style}
            >
            {props.btnTxt}
        </Button>
    );
}
export default button;


