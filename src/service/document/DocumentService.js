import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const getDocumentByProject = (currentProject) => {
    const URL = API_URL + "documents/project/" + currentProject ;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

// const getBacklogByBacklogId = (backlogId) => {
//     const URL = API_URL + "backlog/" + backlogId;
//     return axios.get(URL, {
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization':'Bearer ' + user.jwtToken
//         }
//     })
// }

const addDocumentItem = (data) => {
    const URL = API_URL + "upload";
    return axios.post(URL, 
        data
    ,{
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}


// const updateBacklogItem = (updatedBacklogItem, backlogId) => {
//     const URL = API_URL + "backlog/" + backlogId;
//     return axios.put(URL, updatedBacklogItem, {
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization':'Bearer ' + user.jwtToken
//         }
//     })
// }

// const deleteBacklogItem = (backlogId) => {
//     const URL = API_URL + "backlog/" +  backlogId;
//     return axios.delete(URL, {
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization':'Bearer ' + user.jwtToken
//         }
//     })
// }

export default {
    // getBacklogByProject, getBacklogByBacklogId, deleteBacklogItem, addBacklogItem, updateBacklogItem
    getDocumentByProject,addDocumentItem
};
