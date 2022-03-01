import { API_URL } from "../../data/ApiUrl";
import {headers} from "../../data/RequestHeader";
import axios from "axios";

const getBacklogByProject = (projectName) => {
    const URL = API_URL + projectName + "/backlog";
    return axios.get(URL, {headers: headers});
}

const getBacklogByBacklogId = (backlogId) => {
    const URL = API_URL + "/backlog/" + backlogId;
    return axios.get(URL, {headers: headers})
}

const addBacklogItem = (newBacklogItem) => {
    const URL = API_URL + "/backlog";
    return axios.post(URL, newBacklogItem, {headers: headers})
}

const updateBacklogItem = (updatedBacklogItem, backlogId) => {
    const URL = API_URL + "/backlog/" + backlogId;
    return axios.put(URL, updatedBacklogItem, {headers: headers})
}

const deleteBacklogItem = (backlogId) => {
    const URL = API_URL + "/backlog/" +  backlogId;
    return axios.delete(URL, {headers: headers})
}

export default {
    getBacklogByProject, getBacklogByBacklogId, deleteBacklogItem, addBacklogItem, updateBacklogItem
};
