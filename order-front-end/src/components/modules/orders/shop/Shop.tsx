
import React, { useState, useEffect } from 'react';
import { DATA_PRODUCT_DUMMY } from '../data-dummy/product';
import { Product } from '../interface/product.interface';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Order } from '../interface/order.interface';
import {OrderItem} from './OrderItem';
import { IRootState } from '../../../../reducers/rootReducer.reducer';
import { createOrder, OrderAction } from '../reducers/orders.reducers';
import { MESSAGE_NOTIFICATION, QUANTITY_NUMBER_ADD_DEFAULT, userIdLogin } from '../constants/order.constants';
import { ListItemProduct, OrderList } from '../style/Shop';
import { Button } from '../style/Button';
import { TableOrderItem } from '../style/Table';
import {ProductCard} from './ProductCard';
import {ToastMessage} from '../../../common/ToastMessage';
import { Action, TOAST_BACKGROUND_COLOR } from '../../../../constants/common.constants';

export interface IShopProps extends StateProps, DispatchProps {

}

const Shop: React.FC<IShopProps> = (props) => {

  const listProduct = DATA_PRODUCT_DUMMY;

  const [order, setOrder] = useState<Order>();
  const [status, setStatus] = useState(Action.None);

  useEffect(() => {
    if (props.actionStatus.status === OrderAction.CreateSuccess) {
      setOrder(undefined);
      setStatus(Action.Success);
    }
  }, [props.actionStatus]);

  useEffect(() => {
    setStatus(Action.None);
  }, [])

  const addProductToOrder = (product: Product) => {
    let orderCreate = null;
    if (order) {
      order.userId = userIdLogin;
      const productExists = order.orderItems.find(item => item.product.productId === product.productId);
      if (productExists) {
        order.orderItems.map(item => {
          if (item.product.productId === product.productId) {
            item.quantity += QUANTITY_NUMBER_ADD_DEFAULT;
          }
          return item;
        })
      } else {
        order.orderItems.push({ product, quantity: QUANTITY_NUMBER_ADD_DEFAULT })
      }

      orderCreate = { ...order };
    } else {
      orderCreate = {
        userId: userIdLogin,
        orderItems: [{ product, quantity: QUANTITY_NUMBER_ADD_DEFAULT }]
      }
    }
    setOrder(orderCreate);
  }

  const removeProductFromOrder = (product: Product) => {
    const idxRemove = order?.orderItems?.findIndex(elm => elm.product.productId === product.productId);

    if (order && !_.isNil(idxRemove) && idxRemove >= 0) {
      const orderUpdate = { ...order };
      orderUpdate.orderItems.splice(idxRemove, 1);
      setOrder(orderUpdate);
    }
  }

  const getTotalPrice = () => {
    let price = 0;
    order?.orderItems.forEach(item => {
      price += item.product.price * item.quantity;
    })
    return price;
  }

  const orderProduct = () => {
    setStatus(Action.None);
    let orderCreate = { ...order }
    orderCreate.totalPrice = getTotalPrice();
    props.createOrder(orderCreate);
  }

  return (<>
    <ToastMessage
      message={MESSAGE_NOTIFICATION.CREATED_SUCCESS}
      isDisplay={status !== Action.None ?? false}
      color={status === Action.Success ? TOAST_BACKGROUND_COLOR.SUCCESS : ''} />
    <ListItemProduct>
      {listProduct.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          addProductToOrder={addProductToOrder}
        />
      ))}
    </ListItemProduct>
    <OrderList>
      <TableOrderItem>
        <thead>
          <tr>
            <td>Item</td>
            <td>Description</td>
            <td>Price</td>
            <td>Total</td>
            <td></td>
          </tr>
        </thead>
        {order?.orderItems && order.orderItems.length > 0 &&
          <tbody>
            {order.orderItems.map((item, idx) => (
              <OrderItem
                key={idx}
                item={item}
                removeProductFromOrder={removeProductFromOrder}
              />
            ))}
          </tbody>
        }
      </TableOrderItem>
      {order?.orderItems && order.orderItems.length > 0 &&
        <div>
          <span>Total: </span>
          <span>{getTotalPrice()}$</span>
          <Button right={true} onClick={orderProduct} data-testid="order">Order</Button>
        </div>
      }
    </OrderList>
  </>);
}


const mapStateToProps = ({ orders }: IRootState) => ({
  actionStatus: orders.actionStatus
});

const mapDispatchToProps = {
  createOrder
}

type DispatchProps = typeof mapDispatchToProps;

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
