export enum ORDER_STATUS {
  CREATED = 0,
  DELIVERY = 1,
  CONFIRMED = 2,
  CANCELED = 3,
}

export enum PAYMENT_STATUS {
  DECLINED = 0, // for mocking payment
  CONFIRMED = 1 // for mocking payment
}

export const TIME_DELAY = 30000; // update after 30s
export const TIME_WORK = 30; // 30s in minute => update DB.