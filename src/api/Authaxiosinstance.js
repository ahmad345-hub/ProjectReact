import axios from "axios";
const token=localStorage.getItem("accessToken");
const Authaxiosinstance = axios.create({
  baseURL: '/api',
  headers: {
    'Accept-Language': 'en'
  }
});

export default Authaxiosinstance;
