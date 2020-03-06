import { takeLatest, call, put } from 'redux-saga/effects';
import { customersFetched, addCustomerSuccess, showSnackbar } from '../actionTypes/actionTypes';
import { getAllCustomers, addCustomer } from '../../api/CustomersAPI';
import getErrorMessage from '../../api/APIErrors';

function* getCustomersSaga() {
    try {
        let { data } = yield call(getAllCustomers);
        yield put(customersFetched(data));
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

function* addCustomersSaga(action) {
    try {
        let { data } = yield call(addCustomer, action.payload);
        yield put(addCustomerSuccess(data));
        yield put(showSnackbar({ message: 'Customer Added Successfully' }));
        action.history.push('/dashboard/customers/');
    } catch (e) {
        yield put(showSnackbar(getErrorMessage(e)));
    }
}

export function* watchGetCustomers() {
    yield takeLatest('GET_CUSTOMERS', getCustomersSaga);
}

export function* watchAddCustomers() {
    yield takeLatest('ADD_CUSTOMER', addCustomersSaga);
}