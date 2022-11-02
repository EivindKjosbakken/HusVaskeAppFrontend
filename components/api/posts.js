import axios from 'axios';

export default axios.create({
  baseURL: 'http://10.0.2.2:5000', // use this for emulator
  //baseURL: 'http://localhost:5000', //use this after doing reverse command if running on phsyical device
});
