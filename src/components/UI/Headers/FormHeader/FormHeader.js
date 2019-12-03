import React from 'react';

import './FormHeader.css';

const formHeader = ( props ) => {
    return (
        <div className="FormHeader">
            <label>{props.label}</label>
        </div>
    );

};

export default formHeader;