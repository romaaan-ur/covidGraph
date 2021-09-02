import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default request;
