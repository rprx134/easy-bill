export const getCustomers = () => {
    return { type: 'GET_CUSTOMERS' };
}

export const customersFetched = (customerData) => {
    return { type: 'CUSTOMERS_FETCHED', payload: customerData };
}

export const addCustomer = (customerData, history) => {
    return { type: 'ADD_CUSTOMER', payload: customerData, history };
}

export const addCustomerSuccess = (customerData) => {
    return { type: 'ADD_CUSTOMER_SUCCESS', payload: customerData };
}

export const getProducts = () =>  {
    return { type: 'GET_PRODUCTS' };
}

export const productsFetched = (productData) => {
    return { type: 'PRODUCTS_FETCHED', payload: productData };
}

export const addProduct = (productData, history) => {
    return { type: 'ADD_PRODUCT', payload: productData, history };
}

export const addProductSuccess = (productData) => {
    return { type: 'ADD_PRODUCT_SUCCESS', payload: productData };
}

export const showSnackbar = (payload) => {
    return { type: 'SNACKBAR_SHOW', payload };
};

export const dismissSnackbar = (payload) => {
    return { type: 'SNACKBAR_HIDE', payload };
};

export const getQuotations = () =>  {
    return { type: 'GET_QUOTATIONS' };
}

export const quotationsFetched = (quotationData) => {
    return { type: 'QUOTATIONS_FETCHED', payload: quotationData };
}

export const createQuotation = (quotationData, history) => {
    return { type: 'CREATE_QUOTATION', payload: quotationData, history };
}

export const createQuotationSuccess = (quotationData) => {
    return { type: 'CREATE_QUOTATION_SUCCESS', payload: quotationData };
}

export const downloadQuotationAsDocx = (quotationData) => {
    return { type: 'DOWNLOAD_QUOTATION_AS_DOCX', payload: quotationData };
}

export const getInvoices = () =>  {
    return { type: 'GET_INVOICES' };
}

export const invoicesFetched = (invoiceData) => {
    return { type: 'INVOICES_FETCHED', payload: invoiceData };
}

export const createInvoice = (invoiceData, history) => {
    return { type: 'CREATE_INVOICE', payload: invoiceData, history };
}

export const createInvoiceSuccess = (invoiceData) => {
    return { type: 'CREATE_INVOICE_SUCCESS', payload: invoiceData };
}

export const downloadInvoiceAsDocx = (invoiceData) => {
    return { type: 'DOWNLOAD_INVOICE_AS_DOCX', payload: invoiceData };
}

export const authenticateUser = (userCred, history) => {
    return { type: 'AUTHENTICATE_USER', payload: userCred, history };
}

export const authenticationSuccess = (token) => {
    return { type: 'AUTHENTICATION_SUCCESS', payload: token };
}

export const isLoggedIn = (history) => {
    return { type: 'IS_LOGGED_IN', history };
}