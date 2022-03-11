import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import AuthService from "../authentication/AuthService";

const currentUser = AuthService.getCurrentUser();
const updateUser = (firstName,lastName,email,designation) => {
    const URL = API_URL+"users/"+ currentUser.email;
    return axios.put(URL, {
        firstName,
        lastName,
        email,
        designation
    },{
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });
};

const updatePassword = (newPassword,currentPassword) => {
    const URL = API_URL+"changePassword/"+ currentUser.email;
    return axios.put(URL, {
        newPassword,
        currentPassword,
    },{
        headers: {
            'Authorization':'Bearer ' + currentUser.jwtToken
        }
    });
};

export default {
    updateUser,updatePassword
};

// https://github.com/lahiruhashan/React-Image-Uploader-And-Previewer/blob/master/src/components/ImageUploader.js