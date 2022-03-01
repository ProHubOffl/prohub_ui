import AuthService from "../service/authentication/AuthService"

const user = AuthService.getCurrentUser();

export const headers =  {
    "Content-Type": "application/json",
    'Authorization' :'Bearer'+ user.jwtoken
}
