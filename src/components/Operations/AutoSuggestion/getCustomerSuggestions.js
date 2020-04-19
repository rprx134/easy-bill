import _filter from 'lodash/filter';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';

export const getCustomerSuggestions = (customers) => {
  const groupCustomers = [];
  const customerUniqueNames = _uniq(_map(customers, 'name'));
  customerUniqueNames.forEach(customerName => {
    groupCustomers.push(_uniq(_filter(customers, function (o) {
      return o.name === customerName;
    })));
  });
  const returnValue=[];
  groupCustomers.forEach(group => {
    let suggestionObj = {};
    suggestionObj = { ...suggestionObj, title: group[0].name };
    const suggestionsArray = [];
    group.forEach(customer => {
      suggestionsArray.push({
        _id: customer._id,
        title: customer.name,
        suggestions: "Name: " + customer.name + ", Mobile: " + customer.mobile
      });
    });
    suggestionObj = { ...suggestionObj, suggestions: suggestionsArray};
    returnValue.push(suggestionObj);
  });
  return returnValue;
}