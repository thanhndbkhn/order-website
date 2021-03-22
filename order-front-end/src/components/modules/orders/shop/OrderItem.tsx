import React from 'react';
import { Product } from '../interface/product.interface';
import { ItemOrder } from '../interface/itemOrder.interface';
import { ButtonDelete } from '../style/Button';

export interface IOrderItemProps {
  item: ItemOrder;
  removeProductFromOrder: (product: Product) => void;
}

export const OrderItem: React.FC<IOrderItemProps> = (props) => {

  const removeProductFromOrder = () => {
    props.removeProductFromOrder(props.item.product);
  }
  return (
    <>
      {props.item &&
        <tr>
          <td>
            <img src={props.item.product.imageUrl} alt="" />
          </td>
          <td>
            <h4><p>{props.item.product.productName}</p></h4>
          </td>
          <td >
            <p>${props.item.product.price}</p>
          </td>
          <td>
            <p>${props.item.product.price * props.item.quantity}</p>
          </td>
          <td>
            <ButtonDelete onClick={removeProductFromOrder} >×</ButtonDelete>
          </td>
        </tr>
      }
    </>
  )
}