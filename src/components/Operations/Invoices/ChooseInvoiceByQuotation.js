import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutoSuggest from '../AutoSuggestion/AutoSuggest';
import { getQuotationSuggestions } from '../AutoSuggestion/getQuotationSuggestions';

class ChooseInvoiceByQuotation extends Component {
    static defaultProps = {
        quotations: [],
    };

    static propTypes = {
        quotations: PropTypes.array.isRequired,
    }

    selectedQuotationHandler = (_id) => {
        this.props.selectedQuotation(_id);
    }

    render() {
        const { quotations } = this.props;
        const quotationSuggestions = getQuotationSuggestions(quotations);
        return (
            <AutoSuggest
                suggestions={quotationSuggestions}
                placeHolder={'Search customer by name'}
                onSelectionHandler={this.selectedQuotationHandler} />
        );
    }
}

const mapStateToProps = state => ({
    quotations: state.quotations,
});


export default withRouter(connect(mapStateToProps, null)(ChooseInvoiceByQuotation));