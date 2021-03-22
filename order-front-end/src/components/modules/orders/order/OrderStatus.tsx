import {OrderStatus as Status} from '../style/Order';
import { statusToText } from '../helper/helper';

export interface  IOrderStatusProps {
  orderStatus: number;
}

export const OrderStatus: React.FC<IOrderStatusProps> = (props) => {
  return( 
      <Status status={props.orderStatus}>
        {statusToText(props.orderStatus)}
      </Status>
    )
}