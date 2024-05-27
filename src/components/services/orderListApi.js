import { axiosInstance as axios } from './axiosInstance';

function CREATE_NEW_ORDER_LIST() {
    return 'orderList/create';
}

function GET_ORDER_LIST() {
    return 'orderList/get';
}

function UPDATE_ORDER_LIST() {
    return 'orderList/update';
}

function DELETE_ORDER_LIST() {
    return 'orderList/delete';
}

export function createNewOrderList(orderListBody) {
    return axios.post(CREATE_NEW_ORDER_LIST(), orderListBody);
}

export function getOrderList(orderListId) {
    return axios.get(GET_ORDER_LIST() + '/' + orderListId);
}

export function updateOrderList(orderListId, orderListBody) {
    return axios.put(UPDATE_ORDER_LIST() + '/' + orderListId, orderListBody);
}

export function deleteOrderList(orderListId) {
    return axios.delete(DELETE_ORDER_LIST() + '/' + orderListId);
}

 
