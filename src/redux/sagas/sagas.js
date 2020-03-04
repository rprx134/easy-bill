import { takeLatest, call, put } from 'redux-saga/effects';
import { customersFetched, addCustomerSuccess } from '../actionTypes/actionTypes';
import { getAllCustomers, addCustomer } from '../../api/CustomersAPI';


function* getCustomersSaga() {
    try {
        let { data } = yield call(getAllCustomers);
        yield put(customersFetched(data));
    } catch (e) {

    }
}

function* addCustomersSaga(action) {
    try {
        let { data } = yield call(addCustomer, action.payload);
        yield put(addCustomerSuccess(data));
        action.history.push('/dashboard/customers/');
    } catch (e) {
        console.log(e);
    }
}

export function* watchGetCustomers() {
    yield takeLatest('GET_CUSTOMERS', getCustomersSaga);
}

export function* watchAddCustomers() {
    yield takeLatest('ADD_CUSTOMER', addCustomersSaga);
}