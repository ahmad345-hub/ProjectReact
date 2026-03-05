import axios from "axios";

const token = localStorage.getItem("accessToken");

const Authaxiosinstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  headers: {
    "Accept-Language": "en",
    Authorization: `Bearer ${token}`,
  },
});

export default Authaxiosinstance;