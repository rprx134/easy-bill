import axios from 'axios';

export const getAllProducts = () => {
    return axios.request({
        method: 'get',
        url: 'http://localhost:4000/products/getAllProducts',
    });
}

export const addProduct = (payload) => {
    return axios.request({
        method: 'post',
        url: 'http://localhost:4000/products/AddProduct',
        data: payload
      });
}