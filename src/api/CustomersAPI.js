import axios from 'axios';

export const getAllCustomers = () => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:4000/customers/getAllCustomers',
    });
}

export const addCustomer = (payload) => {
    return axios.post('http://localhost:4000/customers/AddCustomer', payload)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}