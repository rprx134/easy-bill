import { takeLatest, call, put } from 'redux-saga/effects';
import {
    customersFetched,
    addCustomerSuccess,
    showSnackbar,
    productsFetched,
    addProductSuccess,
    invoicesFetched,
    createInvoiceSuccess,
} from '../actionTypes/actionTypes';
import { getAllCustomers, addCustomer } from '../../api/CustomersAPI';
import { getAllProducts, addProduct } from '../../api/ProductsAPI';
import { getAllInvoices, createInvoice } from '../../api/InvoiceAPI';
import getErrorMessage from '../../api/APIErrors';

function* getCustomersSaga() {
    try {
        let { data } = yield call(getAllCustomers);
        yield put(customersFetched(data));
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* addCustomerSaga(action) {
    try {
        let { data } = yield call(addCustomer, action.payload);
        yield put(addCustomerSuccess(data));
        yield put(showSnackbar({ message: 'Customer Added Successfully' }));
        action.history.push('/dashboard/customers/');
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* getProductsSaga() {
    try {
        let { data } = yield call(getAllProducts);
        yield put(productsFetched(data));
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* addProductSaga(action) {
    try {
        let { data } = yield call(addProduct, action.payload);
        yield put(addProductSuccess(data));
        yield put(showSnackbar({ message: 'Product Added Successfully' }));
        action.history.push('/dashboard/products/');
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* getInvoicesSaga() {
    try {
        let { data } = yield call(getAllInvoices);
        yield put(invoicesFetched(data));
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* createInvoiceSaga(action) {
    try {
        let { data } = yield call(createInvoice, action.payload);
        yield put(createInvoiceSuccess(data));
        yield put(showSnackbar({ message: 'Invoice Added Successfully' }));
        action.history.push('/dashboard/invoice/');
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

export function* watchGetCustomers() {
    yield takeLatest('GET_CUSTOMERS', getCustomersSaga);
}

export function* watchAddCustomers() {
    yield takeLatest('ADD_CUSTOMER', addCustomerSaga);
}

export function* watchGetProducts() {
    yield takeLatest('GET_PRODUCTS', getProductsSaga);
}

export function* watchAddProducts() {
    yield takeLatest('ADD_PRODUCT', addProductSaga);
}

export function* watchGetInvoices() {
    yield takeLatest('GET_INVOICES', getInvoicesSaga);
}

export function* watchCreateInvoice() {
    yield takeLatest('CREATE_INVOICE', createInvoiceSaga)
}