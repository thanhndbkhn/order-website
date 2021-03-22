import { ORDER_STATUS } from "../constants/order.constants";

export const statusToText = (statusType: ORDER_STATUS ): string => {
  switch (statusType) {
    case ORDER_STATUS.CREATED:
      return 'CREATED';
    case ORDER_STATUS.DELIVERY:
      return 'DELIVERY';
    case ORDER_STATUS.CONFIRMED:
      return 'CONFIRMED';
    case ORDER_STATUS.CANCELED:
      return 'CANCELED';
    default:
      return 'NONE';
  }
}