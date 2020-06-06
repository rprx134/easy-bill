import axios from './AxiosInstance';

export const getAllQuotations = () => {
    return axios.request({
        method: 'get',
        url: 'quotations/getAllQuotations',
    });
}

export const createQuotation = (payload) => {
    return axios.request({
        method: 'post',
        url: 'quotations/CreateQuotation',
        data: payload
    });
}

export const downloadQuotationAsDocx = (payload) => {
    return axios.request({
        method: 'get',
        url: 'quotations/DownloadQuotationAsDocx?quotationID=' + payload.quotationID,
        responseType: 'blob',
        timeout: 30000,
    });
}