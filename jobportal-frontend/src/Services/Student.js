import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/students";

export const studentRegistrationForm = (data) =>
  axios.post(REST_API_BASE_URL, data);

export const studentLoginForm = (data) =>
  axios.post(REST_API_BASE_URL + "/login", data);
