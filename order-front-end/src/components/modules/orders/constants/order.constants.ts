export const LIMIT = 10;
export const OFFSET = 0;

export const TIME_DISPLAY_TOASTS = 2000;
export const TIME_UPDATE_DATA_ORDER = 30000;

export const QUANTITY_NUMBER_ADD_DEFAULT = 1;
// default userID = 1
export const userIdLogin = 1;

export enum ORDER_STATUS {
  CREATED = 0,
  DELIVERY = 1,
  CONFIRMED = 2,
  CANCELED = 3,
}

export const STATUS_RESPONSE = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500
}

export const MESSAGE_NOTIFICATION = {
  CREATED_SUCCESS: 'Created successfully',
  CANCELED_ERROR: 'Order already delivered or canceled before',
  CANCELED_SUCCESS: 'Canceled successfully'
}