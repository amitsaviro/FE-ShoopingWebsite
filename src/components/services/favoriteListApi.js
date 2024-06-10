import { axiosInstance as axios } from './axiosInstance';

function CREATE_NEW_FAVORITE_LIST() {
    return 'favoriteList/create';
}

function GET_FAVORITE_LIST() {
    return 'favoriteList/get';
}

function UPDATE_FAVORITE_LIST() {
    return 'favoriteList/update';
}

function DELETE_FAVORITE_LIST() {
    return 'favoriteList/delete';
}
function GET_ALL_FAVORITE_LIST_BY_CUSTOMER_ID(customerId) {
    return `favoriteList/getAllFavoriteListByCustomerId/${customerId}`;
}

export function createNewFavoriteList(favoriteListBody) {
    return axios.post(CREATE_NEW_FAVORITE_LIST(), favoriteListBody);
}

export function getFavoriteList(favoriteListId) {
    return axios.get(GET_FAVORITE_LIST() + '/' + favoriteListId);
}

export function updateFavoriteList(favoriteListId, favoriteListBody) {
    return axios.put(UPDATE_FAVORITE_LIST() + '/' + favoriteListId, favoriteListBody);
}

export function deleteFavoriteList(customerId, itemId) {
    return axios.delete(DELETE_FAVORITE_LIST() + `/${customerId}/${itemId}`);
}
export function getAllFavoriteListByCustomerId(customerId) {
    return axios.get(GET_ALL_FAVORITE_LIST_BY_CUSTOMER_ID(customerId));
}

 
