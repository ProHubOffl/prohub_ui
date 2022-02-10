import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const getImage = () => {
    const URL = API_URL+"userImage/"+ AuthService.getCurrentUser().email +"/download";
    return axios.get(URL);
};

export default {
    getImage
  };