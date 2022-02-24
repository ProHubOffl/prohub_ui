import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const currentUser = AuthService.getCurrentUser();
const getImage = () => {
    const URL = API_URL+"userImage/"+ currentUser.email +"/download";
    return axios.get(URL, {
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });
};

export default {
    getImage
};