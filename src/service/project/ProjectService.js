import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const createProject = (project) => {
    const URL = API_URL + "project";
    return axios.post(URL, project, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

export default {
createProject
};
