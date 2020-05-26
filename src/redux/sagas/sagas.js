import { takeLatest, call, put } from 'redux-saga/effects';
import {
    customersFetched,
    addCustomerSuccess,
    showSnackbar,
    productsFetched,
    addProductSuccess,
    invoicesFetched,
    createInvoiceSuccess,
    authenticationSuccess,
    getCustomers,
    getProducts,
    getInvoices
} from '../actionTypes/actionTypes';
import { getAllCustomers, addCustomer } from '../../api/CustomersAPI';
import { getAllProducts, addProduct } from '../../api/ProductsAPI';
import { getAllInvoices, createInvoice, downloadInvoiceAsDocx } from '../../api/InvoiceAPI';
import { authenticateUser } from '../../api/AuthAPI';
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
        const fileName = 'Invoice-'.concat(action.payload.invoiceID.concat('.docx'));
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, fileName);
            yield put(showSnackbar({ message: 'Invoice Downloaded Successfully' }));
        }
        else {
            var link = document.createElement('a');
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);
            link.href = downloadUrl;
            link.style = "display: none";
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            setTimeout(function () {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            }, 100);
            yield put(showSnackbar({ message: 'Invoice Downloaded Successfully' }));
        }
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* userLoginSaga(action) {
    try {
        let { data } = yield call(authenticateUser, action.payload);
        yield put(authenticationSuccess(data));
        action.history.push("/dashboard/");
        window.location.reload();
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* isLoggedInSaga(action) {
    if (!window.sessionStorage.getItem("token")) {
        yield action.history.push("/login/");
    }
    yield put(getCustomers());
    yield put(getProducts());
    yield put(getInvoices());
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
    yield takeLatest('CREATE_INVOICE', createInvoiceSaga);
}

export function* watchDownloadInvoiceAsDocx() {
    yield takeLatest('DOWNLOAD_INVOICE_AS_DOCX', downloadInvoiceAsDocxSaga);
}

export function* watchUserLoginSaga() {
    yield takeLatest('AUTHENTICATE_USER', userLoginSaga);
}

export function* watchIsLoggedInSaga() {
    yield takeLatest('IS_LOGGED_IN', isLoggedInSaga);
}