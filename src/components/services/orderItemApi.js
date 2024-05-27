import { axiosInstance as axios } from './axiosInstance';

function CREATE_NEW_ORDER_ITEM() {
    return 'orderItem/create';
}

function GET_ORDER_ITEM() {
    return 'orderItem/get';
}

function UPDATE_ORDER_ITEM() {
    return 'orderItem/update';
}

function DELETE_ORDER_ITEM() {
    return 'orderItem/delete';
}

export function createNewOrderItem(orderItemBody) {
    return axios.post(CREATE_NEW_ORDER_ITEM(), orderItemBody);
}

export function getOrderItem(orderItemId) {
    return axios.get(GET_ORDER_ITEM() + '/' + orderItemId);
}

export function updateOrderItem(orderItemId, orderItemBody) {
    return axios.put(UPDATE_ORDER_ITEM() + '/' + orderItemId, orderItemBody);
}

export function deleteOrderItem(orderItemId) {
    return axios.delete(DELETE_ORDER_ITEM() + '/' + orderItemId);
}

 
