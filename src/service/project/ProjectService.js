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

const getProjectByProjectName = (projectName) => {
    const URL = API_URL + "project/" + projectName;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const updateProject = (project, projectName) => {
    const URL = API_URL + "project/" + projectName;
    return axios.put(URL, project, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

export default {
    createProject, getProjectByProjectName, updateProject
};
