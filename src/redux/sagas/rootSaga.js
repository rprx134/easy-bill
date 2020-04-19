import { all } from 'redux-saga/effects';
import {
  watchGetCustomers,
  watchAddCustomers,
  watchGetProducts,
  watchAddProducts,
  watchGetInvoices,
  watchCreateInvoice,
} from './sagas';
export default function* rootSaga() {
  yield all([
    watchGetCustomers(),
    watchAddCustomers(),
    watchGetProducts(),
    watchAddProducts(),
    watchGetInvoices(),
    watchCreateInvoice(),
  ]);
}