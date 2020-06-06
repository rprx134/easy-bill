import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Quotation from '../../../components/Operations/Quotations/Quotation';
import {
    showSnackbar,
    downloadQuotationAsDocx,
} from '../../../redux/actionTypes/actionTypes';
import { bindActionCreators } from 'redux';
import _find from 'lodash/find';

class Quotations extends Component {

    componentDidMount() {
        if (this.props.quotations.length === 0) {
            this.props.showSnackbar({
                message: 'No quotations present! Add one to get started.',
                id: Date.now(),
                variant: "info",
            });
        }
    }

    downloadAsDocHandler = (quotationID) => {
        this.props.downloadQuotationAsDocx({quotationID});
    }

    render() {
        const { quotations, customers } = this.props;
        const renderItem = quotations.map(quotation => {
            const selectedCustomer = _find(customers, (customer) => { return customer._id === quotation.customerID; });
            return (
                <Quotation key={quotation._id}
                    id={quotation._id}
                    selectedCustomer={selectedCustomer}
                    grandTotal={quotation.grandTotal}
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
    quotations: state.quotations,
    customers: state.customers,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showSnackbar,
        downloadQuotationAsDocx,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quotations));