import styled from 'styled-components'
import { ORDER_STATUS } from '../constants/order.constants';

export const ListProductName = styled.div`
  font-weight: bold;
  cursor: pointer;
`
const handleColorType = (status: number) => {
  switch (status) {
    case ORDER_STATUS.CREATED:
      return "#681CFF";
    case ORDER_STATUS.DELIVERY:
      return "#E1FF4D";
    case ORDER_STATUS.CONFIRMED:
      return "#2B543A";
    case ORDER_STATUS.CANCELED:
      return "#FF5719";
    default:
      return "#FFFFF";
  }
};

export const OrderStatus = styled.span<any>`
  display: inline-block;
  padding: 1rem;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 1rem;
  background-color: ${({ status }) => handleColorType(status)};
`
// for popup style
export const PopupDetail = styled.div`
  min-width: 720px;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #04040454;
  top: 0;
  left: 0;
`
export const PopupBody = styled.div`
  width: 60%;
  height: 600px;
  min-width: 530px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`
export const PopupHeader = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`

export const ListProductItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem 2.5rem 1rem;
  img {
    width: 80px;
  }
  div {
    margin-left: 50px;
    span {
      color: var(--secondary);
    }
  }
`
export const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem 2.5rem 1rem;
  div {
    margin-left: 50px; 
  }
`