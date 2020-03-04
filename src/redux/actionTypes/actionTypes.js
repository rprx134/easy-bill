export function getCustomers() {
    return { type: 'GET_CUSTOMERS'};
}

export function customersFetched(customerData) {
    return { type: 'CUSTOMERS_FETCHED', payload: customerData};
}

export function addCustomer(customerData, history) {
    return { type: 'ADD_CUSTOMER', payload: customerData, history};
}

export function addCustomerSuccess(customerData) {
    return { type: 'ADD_CUSTOMER_SUCCESS', payload: customerData};
}