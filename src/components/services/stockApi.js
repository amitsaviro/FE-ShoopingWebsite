import { axiosInstance as axios } from './axiosInstance';

function CREATE_NEW_STOCK() {
    return 'stock/create';
}

function GET_STOCK() {
    return 'stock/get';
}

function UPDATE_STOCK() {
    return 'stock/update';
}

function DELETE_STOCK() {
    return 'stock/delete';
}

export function createNewStock(stockBody) {
    return axios.post(CREATE_NEW_STOCK(), stockBody);
}

export function getStock(stockId) {
    return axios.get(GET_STOCK() + '/' + stockId);
}

export function updateStock(stockId, stockBody) {
    return axios.put(UPDATE_STOCK() + '/' + stockId, stockBody);
}

export function deleteStock(stockId) {
    return axios.delete(DELETE_STOCK() + '/' + stockId);
}

 
