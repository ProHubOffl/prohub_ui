import { API_URL } from "../../data/ApiUrl";
import axios from "axios";

const register = (firstName,lastName,email,designation, password) => {
  return axios.post(API_URL+"register", {
    firstName,
    lastName,
    email,
    designation,
    password    
  },{
    headers: {
      'Content-Type': 'application/json'  } 
  });
};

const login = (email, password) => {
    return axios.post(API_URL+"authenticate", {
      email,
      password
    },{
      headers: {
        'Content-Type': 'application/json'  } 
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.replace('/authenticate')
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};