import {axiosInstancePublic as axios} from './axiosInstancePublic'

function AUTHENTICATE() {
    return 'authenticate/create';
}
export function authenticate(userBody) {
    return axios.post(AUTHENTICATE(), userBody);
}