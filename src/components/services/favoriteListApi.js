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

export function createNewFavoriteList(favoriteListBody) {
    return axios.post(CREATE_NEW_FAVORITE_LIST(), favoriteListBody);
}

export function getFavoriteList(orderListId) {
    return axios.get(GET_FAVORITE_LIST() + '/' + favoriteListId);
}

export function updateFavoriteList(favoriteListId, favoriteListBody) {
    return axios.put(UPDATE_FAVORITE_LIST() + '/' + favoriteListId, favoriteListBody);
}

export function deleteFavoriteList(favoriteListId) {
    return axios.delete(DELETE_FAVORITE_LIST() + '/' + favoriteListId);
}

 
