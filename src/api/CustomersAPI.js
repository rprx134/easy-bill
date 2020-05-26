import axios from './AxiosInstance';

export const getAllCustomers = () => {
    return axios.request({
        method: 'get',
        url: 'customers/getAllCustomers',
    });
}

export const addCustomer = (payload) => {
    return axios.request({
        method: 'post',
        url: 'customers/AddCustomer',
        data: payload
      });
}