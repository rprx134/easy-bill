import { all } from 'redux-saga/effects';
import {
  watchGetCustomers,
  watchAddCustomers,
  watchGetProducts,
  watchAddProducts,
  watchGetQuotations,
  watchCreateQuotation,
  watchDownloadQuotationAsDocx,
  watchGetInvoices,
  watchCreateInvoice,
  watchDownloadInvoiceAsDocx,
  watchUserLoginSaga,
  watchIsLoggedInSaga,
} from './sagas';
export default function* rootSaga() {
  yield all([
    watchGetCustomers(),
    watchAddCustomers(),
    watchGetProducts(),
    watchAddProducts(),
    watchGetQuotations(),
    watchCreateQuotation(),
    watchDownloadQuotationAsDocx(),
    watchGetInvoices(),
    watchCreateInvoice(),
    watchDownloadInvoiceAsDocx(),
    watchUserLoginSaga(),
    watchIsLoggedInSaga(),
  ]);
}