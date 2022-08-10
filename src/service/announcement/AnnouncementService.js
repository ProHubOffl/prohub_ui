import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const getAnnouncementsByProject = (projectName) => {
    const URL = API_URL + projectName + "/announcement";
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

const getAnnouncementByAnnouncementId = (announcementId) => {
    const URL = API_URL + "announcement/" + announcementId;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

const addAnnouncement = (newAnnouncement) => {
    const URL = API_URL + "announcement"
    return axios.post(URL, newAnnouncement, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const updateAnnouncement = (updatedAnnouncement, announcementId) => {
    const URL = API_URL + "announcement/" + announcementId;
    return axios.put(URL, updatedAnnouncement, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const deleteAnnouncement = (announcementId) => {
    const URL = API_URL + "announcement/" + announcementId;
    return axios.delete(URL,{
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

export default {
    getAnnouncementsByProject, getAnnouncementByAnnouncementId, addAnnouncement, updateAnnouncement, deleteAnnouncement
}
