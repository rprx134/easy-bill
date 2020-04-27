import axios from 'axios';

export const getAllInvoices = () => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:4000/invoices/getAllInvoices',
    });
}

export const createInvoice = (payload) => {
    return axios.request({
        method: 'post',
        url: 'http://localhost:4000/invoices/CreateInvoice',
        data: payload
    });
}

export const downloadInvoiceAsDocx = (payload) => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:4000/invoices/DownloadInvoiceAsDocx?invoiceID=' + payload.invoiceID,
        responseType: 'blob',
        timeout: 30000,
    });
}