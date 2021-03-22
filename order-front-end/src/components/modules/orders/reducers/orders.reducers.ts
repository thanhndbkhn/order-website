import { Dispatch } from 'redux';
import axios from 'axios';
import { userIdLogin } from '../constants/order.constants';

export const ACTION_TYPES = {
  CREATE_ORDER: 'create-order',
  GET_LIST_ORDER: 'get-list-order',
  GET_DETAIL_ORDER: 'get-order-detail',
  CANCEL_ORDER: 'cancel-order'
}

export enum OrderAction {
  None = 'None',
  Success = 'Success',
  CreateSuccess = 'Create Success',
  CancelSuccess = 'CancelSuccess',
  GetDetailSuccess = 'GetDetailSuccess',
  GetListSuccess = 'GetListSuccess',
  CancelError = 'CancelError',
  CreateError = 'CreateError',
}

const initialState = {
  orderCreated: null,
  actionStatus: { status: OrderAction.None },
  orderList: [],
  orderDetails: null,
  orderItems: [],
}

export type OrderState = Readonly<typeof initialState>;

// Reducer
const ordersReducer = (state: OrderState = initialState, action: any): OrderState => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_ORDER:
      return {
        ...state,
        actionStatus: action.response.data ? { status: OrderAction.CreateSuccess } : { status: OrderAction.CreateError }
      }
    case ACTION_TYPES.GET_LIST_ORDER:
      return {
        ...state,
        orderList: action.response.data
      }

    case ACTION_TYPES.GET_DETAIL_ORDER:
      return {
        ...state,
        orderDetails: action.response.data,
        orderItems: action.response.data.orderItems,
        actionStatus: { status: OrderAction.GetListSuccess }
      }

    case ACTION_TYPES.CANCEL_ORDER:
      return {
        ...state,
        actionStatus: action.response.data ? { status: OrderAction.CancelSuccess } : { status: OrderAction.CancelError }
      }

    default:
      return {
        ...state,
      }
  }
}

export default ordersReducer;

export const createOrder: (order: any) => void = order => async (dispatch: Dispatch) => {
  const response = await axios.post(
    process.env.REACT_APP_ORDER_API + ``,
    order,
    { headers: { 'Content-Type': 'application/json' } }
  ).catch(err => {
    return err;
  });

  dispatch({
    type: ACTION_TYPES.CREATE_ORDER,
    response: response
  });
}

export const getListOder: (limit: number, offset: number) => void = (limit, offset) => async (dispatch: Dispatch) => {
  const response = await axios.get(
    process.env.REACT_APP_ORDER_API + ``,
    {
      params: {
        userId: userIdLogin,
        limit,
        offset
      }
    }
  )

  dispatch({
    type: ACTION_TYPES.GET_LIST_ORDER,
    response: response
  });
}

export const getOrderDetails: (orderId: string) => void = (orderId) => async (dispatch: Dispatch) => {
  const response = await axios.get(
    process.env.REACT_APP_ORDER_API + `/${orderId}`,
  );

  dispatch({
    type: ACTION_TYPES.GET_DETAIL_ORDER,
    response: response
  });
}

export const cancelOrder: (orderId: string) => void = (orderId) => async (dispatch: Dispatch) => {
  const response = await axios.put(
    process.env.REACT_APP_ORDER_API + `/${orderId}/cancel`,
  ).catch(err => {
    return err;
  });

  dispatch({
    type: ACTION_TYPES.CANCEL_ORDER,
    response: response
  });
}