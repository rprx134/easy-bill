
import { store } from '../index';
import _find from 'lodash/find';

export const getQuotationById = (id) => {
    const quotations = store.getState().quotations;
    return _find(quotations, (quotation) => quotation._id === id);
}