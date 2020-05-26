import axios from './AxiosInstance';

export const getAllProducts = () => {
    return axios.request({
        method: 'get',
        url: 'products/getAllProducts',
    });
}

export const addProduct = (payload) => {
    return axios.request({
        method: 'post',
        url: 'products/AddProduct',
        data: payload
      });
}