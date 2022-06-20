import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const getProjectUserRoles = (projectName) => {
    const URL = API_URL + "projectUserRole/" + projectName;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

const addProjectUserRole = (projectUserRole) => {
    const URL = API_URL + "projectUserRole";
    return axios.post(URL, projectUserRole, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const updateProjectUserRole = (projectName, modifiedProjectUserRole) => {
    const URL = API_URL + modifiedProjectUserRole.email + "/projectUserRole/" + projectName;
    return axios.put(URL, modifiedProjectUserRole, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const deleteProjectUserRole = (email, projectName) => {
    const URL = API_URL + email + "/projectUserRole/" + projectName;
    return axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    }) 
}

export default {
    getProjectUserRoles, addProjectUserRole, updateProjectUserRole, deleteProjectUserRole
};