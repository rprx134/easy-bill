import React from 'react';

import './Anchor.css';

const anchor = ( props ) => {
    return (
        <div className="Anchor">
            <a href={props.link}>{props.anchorText}</a>
        </div>
    );
};

export default anchor;