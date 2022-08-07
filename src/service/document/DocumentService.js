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


const updateDocumentItem = (data, documentId) => {
    const URL = API_URL + "documents/update/" + documentId;
    return axios.put(URL, data, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const deleteDocumentItem = (documentId) => {
    const URL = API_URL + "documents/remove/" +  documentId;
    return axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const downloadFile = (documentId) => {
    const URL = API_URL + "documents/" +  documentId;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const getDocumentCountByProject = (currentProject) => {
    const URL = API_URL + "documents/count/" + currentProject ;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

export default {
    deleteDocumentItem,getDocumentByProject,addDocumentItem,updateDocumentItem,downloadFile,getDocumentCountByProject
};
