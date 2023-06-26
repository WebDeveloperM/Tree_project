import {Platform} from "react-native";

const domain = Platform.select({android: 'http://10.0.2.2:8000', ios: 'http://127.0.0.1:8000'})

export const REGISTER = `${domain}/api/v1/users/register/`
export const LOGIN = `${domain}/api/v1/users/login/`
export const PAYMENTS = 'http://127.0.0.1:8000/api/v1/finance/payments/'
export const ADD_CARD = 'http://127.0.0.1:8000/api/v1/finance/cards/'
export const GET_CARD = 'http://127.0.0.1:8000/api/v1/finance/cardslist/'

export const GET_JOBS = 'http://127.0.0.1:8000/api/v1/main/order/'
export const GET_ORDERS_DATA = 'http://127.0.0.1:8000/api/v1/main/full-order-data/'
export const GET_MY_WORK = 'http://127.0.0.1:8000/api/v1/main/farmer-order/'

export const ORDER_CHANGE = 'http://127.0.0.1:8000/api/v1/main/order-change/'

export const LAST_ORDERS = 'http://127.0.0.1:8000/api/v1/main/last-orders/'