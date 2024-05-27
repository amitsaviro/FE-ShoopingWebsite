import {axiosInstance as axios} from './axiosInstance'

function AUTHENTICATE() {
    return 'authenticate/create';
}
export function authenticate(userBody) {
    return axios.post(AUTHENTICATE(), userBody);
}