import axios from './AxiosInstance';

export const getAllInvoices = () => {
    return axios.request({
        method: 'get',
        url: 'invoices/getAllInvoices',
    });
}

export const createInvoice = (payload) => {
    return axios.request({
        method: 'post',
        url: 'invoices/CreateInvoice',
        data: payload
    });
}

export const downloadInvoiceAsDocx = (payload) => {
    return axios.request({
        method: 'get',
        url: 'invoices/DownloadInvoiceAsDocx?invoiceID=' + payload.invoiceID,
        responseType: 'blob',
        timeout: 30000,
    });
}