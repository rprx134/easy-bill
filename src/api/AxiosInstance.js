import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://graffiti-billing-node.herokuapp.com/'
    // baseURL: 'http://localhost:4000/'
});

const token = window.sessionStorage.getItem("token");
if (token) {
    instance.defaults.headers.common['auth-token'] = token;
}

export default instance;