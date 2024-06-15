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

function GET_ORDER_ITEMS_BY_ORDER_LIST_ID() {
    return 'orderItem/getAllItemsByOrderListId';
}

function DELETE_ALL_ORDER_ITEMS_BY_ORDER_LIST_ID() {
    return 'orderItem/deleteAllOrderItemByOrderListId';
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

export function getOrderItemsByOrderListId(orderListId) {
    return axios.get(GET_ORDER_ITEMS_BY_ORDER_LIST_ID() + '/' + orderListId);
}

export function deleteAllOrderItemsByOrderListId(orderListId) {
    return axios.delete(DELETE_ALL_ORDER_ITEMS_BY_ORDER_LIST_ID() + '/' + orderListId);
}
