import axios from 'axios';

export const getAllCustomers = () => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:4000/customers/getAllCustomers',
    });
}

export const addCustomer = (payload) => {
    return axios.request({
        method: 'post',
        url: 'http://localhost:4000/customers/AddCustomer',
        data: payload
      });
}