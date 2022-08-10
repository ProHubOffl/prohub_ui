import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const getBacklogByProject = (projectName) => {
    const URL = API_URL + projectName + "/backlog";
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

const getBacklogByBacklogId = (backlogId) => {
    const URL = API_URL + "backlog/" + backlogId;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const addBacklogItem = (newBacklogItem) => {
    const URL = API_URL + "backlog";
    return axios.post(URL, newBacklogItem, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const updateBacklogItem = (updatedBacklogItem, backlogId) => {
    const URL = API_URL + "backlog/" + backlogId;
    return axios.put(URL, updatedBacklogItem, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const deleteBacklogItem = (backlogId) => {
    const URL = API_URL + "backlog/" +  backlogId;
    return axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const getBacklogbyEmail = (email) => {
    const URL = API_URL + "backlogs/" + email;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

export default {
    getBacklogByProject, getBacklogByBacklogId, deleteBacklogItem, addBacklogItem, updateBacklogItem, getBacklogbyEmail
};
