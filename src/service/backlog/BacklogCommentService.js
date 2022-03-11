import { API_URL } from "../../data/ApiUrl";
import {headers} from "../../data/RequestHeader";
import axios from "axios";

const getCommentsByBacklog = (backlogId) => {
    const URL = API_URL + "/backlog/backlogComment/" + backlogId;
    return axios.get(URL, {headers: headers});
}

const getCommentByCommentId = (commentId) => {
    const URL = API_URL + "/backlogComment/" + commentId;
    return axios.get(URL, {headers: headers})
}

const addBacklogComment = (newBacklogComment) => {
    const URL = API_URL + "/backlogComment";
    return axios.post(URL, newBacklogComment, {headers: headers})
}

const updateBacklogComment = (updatedBacklogComment, commentId) => {
    const URL = API_URL + "/backlogComment/" + commentId;
    return axios.put(URL, updatedBacklogComment, {headers: headers})
}

const deleteBacklogComment = (commentId) => {
    const URL = API_URL + "/backlogComment/" +  commentId;
    return axios.delete(URL, {headers: headers})
}

export default {
    getCommentsByBacklog, getCommentByCommentId, addBacklogComment, updateBacklogComment, deleteBacklogComment
};
