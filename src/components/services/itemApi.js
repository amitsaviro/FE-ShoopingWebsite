import { axiosInstancePublic as axios } from './axiosInstancePublic';

function CREATE_NEW_ITEM() {
    return 'item/create';
}

function GET_ITEM() {
    return 'item/get';
}

function UPDATE_ITEM() {
    return 'item/update';
}

function DELETE_ITEM() {
    return 'item/delete';
}
function GET_ALL_ITEMS() {
    return 'item/getAllItems';
}

export function createNewItem(itemBody) {
    return axios.post(CREATE_NEW_ITEM(), itemBody);
}

export function getItem(itemId) {
    return axios.get(GET_ITEM() + '/' + itemId);
}

export function updateItem(itemId, itemBody) {
    return axios.put(UPDATE_ITEM() + '/' + itemId, itemBody);
}

export function deleteItem(itemId) {
    return axios.delete(DELETE_ITEM() + '/' + itemId);
}
export function getAllItems() {
    return axios.get(GET_ALL_ITEMS());
}

 
