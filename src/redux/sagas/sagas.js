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
import { getAllInvoices, createInvoice, downloadInvoiceAsDocx } from '../../api/InvoiceAPI';
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

function* downloadInvoiceAsDocxSaga(action) {
    try {
        let { data } = yield call(downloadInvoiceAsDocx, action.payload);
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        if (navigator.msSaveOrOpenBlob)
            navigator.msSaveOrOpenBlob(blob, 'filename.docx');
        else {
            var link = document.createElement('a');
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);
            link.href = downloadUrl;
            link.style = "display: none";
            link.download = 'filename.docx';
            document.body.appendChild(link);
            link.click();
            setTimeout(function () {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            }, 100);
        }
        // const fileBlob = yield data.blob();
        // using downloadjs https://www.npmjs.com/package/downloadjs
        // download(fileBlob);
        yield put(showSnackbar({ message: 'Invoice Downloaded Successfully' }));
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

export function* watchDownloadInvoiceAsDocx() {
    yield takeLatest('DOWNLOAD_INVOICE_AS_DOCX', downloadInvoiceAsDocxSaga)
}
