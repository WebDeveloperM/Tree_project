import {Platform} from "react-native";

const domain = 'http://127.0.0.1:8000'
// "https://api.tree1.co"
// && Platform.select({
//     android: 'http://10.0.2.2:8000',
//     ios: 'http://127.0.0.1:8000'
// })

export const REGISTER = `${domain}/api/v1/users/register/`
export const LOGIN = `${domain}/api/v1/users/login/`
export const PAYMENTS = `${domain}/api/v1/finance/payments/`
export const ADD_CARD = `${domain}/api/v1/finance/cards/`
export const GET_CARD = `${domain}/api/v1/finance/cardslist/`
export const GET_JOBS = `${domain}/api/v1/main/order/`
export const GET_ORDERS_DATA = `${domain}/api/v1/main/full-order-data/`
export const GET_MY_WORK = `${domain}/api/v1/main/farmer-order/`
export const ORDER_CHANGE = `${domain}/api/v1/main/order-change/`
export const LAST_ORDERS = `${domain}/api/v1/main/last-orders/`
export const INVESTOR_ORDERS = `${domain}/api/v1/finance/investor-orders/`
export const MAIN_PLANTS = `${domain}/api/v1/main/plant/`
export const ORDER_DONE = `${domain}/api/v1/main/orders-done/`
