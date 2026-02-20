import axios from "axios";

const axiosinstance = axios.create({
  baseURL: '/api',
  headers: {
    'Accept-Language': 'en'
  }
});

export default axiosinstance;
