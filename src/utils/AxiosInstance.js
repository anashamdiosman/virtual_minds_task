import axios from "axios";
const BASE_URL = "http://localhost:9000/vm-api/v1";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
