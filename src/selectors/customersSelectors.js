
import { store } from '../index';
import _find from 'lodash/find';

export const getCustomerById = (id) => {
    const customers = store.getState().customers;
    return _find(customers, (customer) => customer._id === id);
}