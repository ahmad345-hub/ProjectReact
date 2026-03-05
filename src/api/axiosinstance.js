import axios from "axios";

const axiosinstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api',
  headers: {
    'Accept-Language': 'en'
  }
});

export default axiosinstance;
