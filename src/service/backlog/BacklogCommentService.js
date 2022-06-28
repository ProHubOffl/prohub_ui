import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const user = AuthService.getCurrentUser();

const getCommentsByBacklog = (backlogId) => {
    const URL = API_URL + "backlog/backlogComment/" + backlogId;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    });
}

const getCommentByCommentId = (commentId) => {
    const URL = API_URL + "backlogComment/" + commentId;
    return axios.get(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const addBacklogComment = (newBacklogComment) => {
    const URL = API_URL + "backlogComment";
    return axios.post(URL, newBacklogComment, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const updateBacklogComment = (updatedBacklogComment, commentId) => {
    const URL = API_URL + "backlogComment/" + commentId;
    return axios.put(URL, updatedBacklogComment, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

const deleteBacklogComment = (commentId) => {
    const URL = API_URL + "backlogComment/" +  commentId;
    return axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization':'Bearer ' + user.jwtToken
        }
    })
}

export default {
    getCommentsByBacklog, getCommentByCommentId, addBacklogComment, updateBacklogComment, deleteBacklogComment
};
