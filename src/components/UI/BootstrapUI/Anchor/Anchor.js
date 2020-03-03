import React from 'react';
import './Anchor.css';

const anchor = (props) => {
    return (
        <a className="btn btn-link" href={props.url} id={props.aID}>{props.ancTxt}</a>
    );
}

export default anchor;


