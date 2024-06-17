import {axiosInstancePublic as axios} from './axiosInstancePublic'

function CREATE_NEW_CUSTOMER() {
    return 'customer/create';
}

function GET_CUSTOMER() {
    return 'customer/get';
}

function UPDATE_CUSTOMER() {
    return 'customer/update';
}

function DELETE_CUSTOMER() {
    return 'customer/delete';
}
function GET_ALL_CUSTOMERS() {
    return 'customer/getAllCustomer';
}

export function createNewCustomer(customerBody) {
    return axios.post(CREATE_NEW_CUSTOMER(), customerBody);
}

export function getCustomer(customerId) {
    return axios.get(GET_CUSTOMER() + '/' + customerId);
}

export function updateCustomer(customerBody) {
    return axios.put(UPDATE_CUSTOMER(), customerBody);
}

export function deleteCustomer(customerId) {
    return axios.delete(DELETE_CUSTOMER() + '/' + customerId);
}
export function getAllCustomers() {
    return axios.get(GET_ALL_CUSTOMERS());
}
