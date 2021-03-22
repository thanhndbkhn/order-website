import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { IRootState } from '../../../../reducers/rootReducer.reducer';
import { getListOder, OrderAction } from '../reducers/orders.reducers';
import { LIMIT, OFFSET, TIME_UPDATE_DATA_ORDER } from '../constants/order.constants';
import { Order } from '../interface/order.interface';
import { ItemOrder } from '../interface/itemOrder.interface';
import Moment from 'moment';
import OrderDetails from './OrderDetails'
import { TableOrderList } from '../style/Table';
import { ListProductName } from '../style/Order';
import { OrderStatus } from './OrderStatus';
import { Pagination } from '../../../common/Pagination';
export interface IOrderListProps extends DispatchProps, StateProps {

}

const OrderList: React.FC<IOrderListProps> = (props) => {
  const [idOrderOpen, setIdOrderOpen] = useState('');
  const [offset, setOffset] = useState(OFFSET);

  useEffect(() => {
    props.getListOder(LIMIT, OFFSET);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const interval = setInterval(() => props.getListOder(LIMIT, offset), TIME_UPDATE_DATA_ORDER);
    return (() => {
      clearInterval(interval);
    });
    // eslint-disable-next-line
  }, [offset])


  useEffect(() => {
    if (props.actionStatus.status === OrderAction.CancelSuccess) {
      props.getListOder(LIMIT, offset);
    }
    // eslint-disable-next-line
  }, [props.actionStatus])

  const formatDate = (date: Moment.MomentInput) => {
    return Moment(date).format('DD/MM/yyyy')
  }

  const openOrderDetail = (order: any) => {
    setIdOrderOpen(order._id);
  }

  const changePageNumber = (offset: number) => {
    props.getListOder(LIMIT, offset);
    setOffset(offset);
  }

  return (<>
    <Pagination changePageNumberCb={changePageNumber} />
    {props.orderList && props.orderList.length > 0 &&
      <>
        <TableOrderList>
          <thead>
            <tr>
              <th>ListProduct</th>
              <th>Total payment</th>
              <th>Date Create</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.orderList.map((order: Order, idx) => (
              <tr key={idx}>
                <td>
                  <div>
                    <ListProductName data-testid={order.orderId} onClick={() => openOrderDetail(order)}>
                      {order?.orderItems?.map((itemOrder: ItemOrder, index) => (
                        // eslint-disable-next-line
                        <a key={index}>
                          {index > 0 ? ', ' : ''}
                          {itemOrder.product?.productName}
                        </a>
                      ))}</ListProductName>
                  </div>
                </td>
                <td>
                  <div>${order.totalPrice}</div>
                </td>
                <td>
                  <div>{formatDate(order.createdAt)}</div>
                </td>
                <td>
                  <OrderStatus orderStatus={order.orderStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableOrderList>
      </>
    }
    {idOrderOpen &&
      <OrderDetails
        orderId={idOrderOpen}
        closeOrderDetails={() => setIdOrderOpen('')} />}
  </>);
}

const mapStateToProps = ({ orders }: IRootState) => ({
  actionStatus: orders.actionStatus,
  orderList: orders.orderList
});

const mapDispatchToProps = {
  getListOder
}

type DispatchProps = typeof mapDispatchToProps;

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
