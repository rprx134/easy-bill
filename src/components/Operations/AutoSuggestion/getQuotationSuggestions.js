import _groupBy from 'lodash/groupBy';
import _mapKeys from 'lodash/mapKeys';
import _forOwn from 'lodash/forOwn';
import { getCustomerById } from '../../../selectors/customersSelectors';

export const getQuotationSuggestions = (quotations) => {
    const quotationsForCustomer = _mapKeys(_groupBy(quotations, 'customerID'), (quotations, customerID) => {
        const customer = getCustomerById(customerID);
        return customer.name + ', ' + customer._id;
    });
    let quotationSuggestions = [];
    _forOwn(quotationsForCustomer, function (quotations, customer) {
        const suggestions = quotations.map(quotations => {
            return {
                _id: quotations._id,
                title: customer,
                suggestions: quotations._id,
            };
        });
        quotationSuggestions.push({
            title: customer,
            suggestions,
        });
    });
    return quotationSuggestions;
}