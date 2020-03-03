import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Customer from '../../../components/Operations/Customers/Customer/Customer';

class Customers extends Component {

    render() {
        const { customers } = this.props;
        const renderItem = customers.map(customer => {
            return (
                <Customer key={customer._id}
                    name={customer.name}
                    email={customer.email}
                    mobile={customer.mobile}
                    gstin={customer.gstin}
                />
            );
        });
        return (
            <Fragment>
                {renderItem}
            </Fragment >
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers,
});

export default withRouter(connect(mapStateToProps, null)(Customers));