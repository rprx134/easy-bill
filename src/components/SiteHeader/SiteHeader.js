import React from 'react';
import './SiteHeader.css';

const siteHeader = () => {
    return(
        <div className="SiteHeader">
            <a href='#'>Logo</a>
            <a href='#'>Invoices</a>
        </div>
    );
}

export default siteHeader;