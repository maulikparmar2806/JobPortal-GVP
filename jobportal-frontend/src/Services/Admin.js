import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/admin";

export const studentRegistrationForm = (data) =>
  axios.post(REST_API_BASE_URL, data);

export const AdminLoginForm = (data) =>
  axios.post(REST_API_BASE_URL + "/login", data);
