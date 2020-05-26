import axios from './AxiosInstance';

export const authenticateUser = (payload) => {
    return axios.request({
        method: 'post',
        url: 'api/user/login',
        data: payload
      });
}
