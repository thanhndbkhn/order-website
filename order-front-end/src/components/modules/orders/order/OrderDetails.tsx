import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { IRootState } from '../../../../reducers/rootReducer.reducer';
import { getOrderDetails, cancelOrder, OrderAction } from '../reducers/orders.reducers';
import * as R from 'ramda';
import { MESSAGE_NOTIFICATION, ORDER_STATUS } from '../constants/order.constants';
import { OrderInfo, ListProductItem, PopupBody, PopupDetail, PopupHeader } from '../style/Order';
import { ButtonCancel, ButtonConfirm } from '../style/Button';
import {ToastMessage} from '../../../common/ToastMessage';
import { statusToText } from '../helper/helper';
import { Action, TOAST_BACKGROUND_COLOR } from '../../../../constants/common.constants';
import { ItemOrder } from '../interface/itemOrder.interface';
export interface IOrderDetailsProps extends DispatchProps, StateProps {
  orderId: string;
  closeOrderDetails?: () => void;
}

const OrderDetails: React.FC<IOrderDetailsProps> = (props) => {

  const [status, setStatus] = useState(Action.None);

  useEffect(() => {
    props.getOrderDetails(props.orderId);
    setStatus(Action.None);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (props.actionStatus.status === OrderAction.CancelSuccess) {
      props.getOrderDetails(props.orderId);
      setStatus(Action.Success)
    }
    if (props.actionStatus.status === OrderAction.CancelError) {
      props.getOrderDetails(props.orderId);
      setStatus(Action.Error)
    }
    // eslint-disable-next-line
  }, [props.actionStatus]);

  const cancelOrder = () => {
    props.cancelOrder(props.orderId)
  }

  return (
    <PopupDetail>
      <ToastMessage
        message={status === Action.Success ? MESSAGE_NOTIFICATION.CANCELED_SUCCESS : MESSAGE_NOTIFICATION.CANCELED_ERROR}
        isDisplay={status !== Action.None ?? false}
        color={status === Action.Success ? TOAST_BACKGROUND_COLOR.SUCCESS : TOAST_BACKGROUND_COLOR.ERROR} />
      <PopupBody >
        <PopupHeader data-testid="detail-order">
          Order Details
        </PopupHeader>
        {props.orderDetails &&
          <div>
            {props.orderItems && props.orderItems.map((item: ItemOrder, idx) => (
              <ListProductItem key={idx}>
                <img src={item.product.imageUrl} alt="" />
                <div>
                  <h3>{item.product.productName}</h3>
                </div>
                <div>
                  <h2>{item.quantity}</h2>
                </div>
                <div>
                  <span>$ {item.product.price}</span>
                  {/* <time className="recent-time">Sep 25, 2019</time> */}
                </div>
              </ListProductItem>
            ))}
            <OrderInfo>
              <div>
                <h3>Total : {R.path(['totalPrice'], props.orderDetails)}$</h3>
              </div>
              <div>
                <h2>Status: {statusToText(R.path(['orderStatus'], props.orderDetails) ?? 0)}</h2>
              </div>
              <div>
                <ButtonConfirm onClick={props.closeOrderDetails}>OK</ButtonConfirm>
                <span>  </span>
                {R.path(['orderStatus'], props.orderDetails) === ORDER_STATUS.CONFIRMED &&
                  <ButtonCancel onClick={cancelOrder}>Cancel</ButtonCancel>
                }
              </div>
            </OrderInfo>
          </div>}
      </PopupBody>
    </PopupDetail>
  )
}


const mapStateToProps = ({ orders }: IRootState) => ({
  actionStatus: orders.actionStatus,
  orderDetails: orders.orderDetails,
  orderItems: orders.orderItems
});

const mapDispatchToProps = {
  getOrderDetails,
  cancelOrder
}

type DispatchProps = typeof mapDispatchToProps;

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);

