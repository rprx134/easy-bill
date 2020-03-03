import { all } from 'redux-saga/effects';
import {
  watchGetCustomers,
  watchAddCustomers,
} from './sagas';
export default function* rootSaga() {
  yield all([
    watchGetCustomers(),
    watchAddCustomers(),
  ]);
}