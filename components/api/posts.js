import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

const api = axios.create({
  //baseURL: 'http://10.0.2.2:5000', // use this for emulator
  baseURL: 'http://localhost:5000', //use this after doing reverse command if running on phsyical device
  config: {
    headers: {
      Authorization: '',
    },
  },
});

//intercept and add token
api.interceptors.request.use(
  async config => {
    const newToken = await SInfo.getItem('token', {});
    config.headers['Authorization'] = 'Bearer ' + newToken;
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default api;
