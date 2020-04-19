import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Invoice from '../../../components/Operations/Invoices/Invoice';
import { showSnackbar } from '../../../redux/actionTypes/actionTypes';
import { bindActionCreators } from 'redux';
import _find from 'lodash/find';
import App from '../../../components/Operations/WordDocumentGenerator/example';


class Invoices extends Component {

    componentDidMount() {
        if (this.props.invoices.length === 0) {
            this.props.showSnackbar({
                message: 'No invoices present! Add one to get started.',
                id: Date.now(),
                variant: "info",
            });
        }
    }

    downloadAsDocHandler = (invoiceID) => {
        console.log(invoiceID);
        
    }

    render() {
        const { invoices, customers } = this.props;
        const renderItem = invoices.map(invoice => {
            const selectedCustomer = _find(customers, (customer) => { return customer._id === invoice.customerID; });
            return (
                <Invoice key={invoice._id}
                    id={invoice._id}
                    selectedCustomer={selectedCustomer}
                    grandTotal={invoice.grandTotal}
                    downloadAsDoc={this.downloadAsDocHandler}
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
    invoices: state.invoices,
    customers: state.customers,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showSnackbar
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoices));