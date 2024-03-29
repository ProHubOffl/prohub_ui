import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const currentUser = AuthService.getCurrentUser();
const getImage = () => {
    const URL = API_URL+"userImage/"+ currentUser.email +"/download";
    return axios.get(URL, {
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });
};

const getImageByEmail = (email) => {
    const URL = API_URL+"userImage/"+ email +"/download";
    return axios.get(URL, {
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });
}

const updateImage = (data)  => {
    const URL = API_URL+"userImage/"+ currentUser.email+"/update";
    return axios.put(URL, data,
    {
        headers: {
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });

};

const uploadImage = (data)  => {
    const URL = API_URL+"userImage/"+ currentUser.email;
    return axios.post(URL, data,
    {
        headers: {
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });

};

const RemoveImage = ()  => {
    const URL = API_URL+"userImage/"+ currentUser.email;
    return axios.delete(URL, {
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });

};

export default {
    getImage,
    uploadImage,
    RemoveImage,
    getImageByEmail,
    updateImage
};
