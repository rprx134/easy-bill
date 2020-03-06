import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Customer from '../../../components/Operations/Customers/Customer/Customer';
import { showSnackbar } from '../../../redux/actionTypes/actionTypes';
import { bindActionCreators } from 'redux';

class Customers extends Component {

    componentDidMount() {
        if (this.props.customers.length === 0) {
            this.props.showSnackbar({
                message: 'No customers present! Add one to get started.',
                id: Date.now(),
                variant: "info",
            });
        }
    }

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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showSnackbar
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customers));