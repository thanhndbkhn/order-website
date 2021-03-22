import { useEffect, useState } from 'react';
import { TIME_DISPLAY_TOASTS } from '../modules/orders/constants/order.constants';
import { Toast } from '../style/Toasts';

export interface IToastMessageProps {
  message: string;
  isDisplay?: boolean;
  color?: string;
}

export const ToastMessage: React.FC<IToastMessageProps> = (props) => {
  const [toastDisplay, setToastDisplay] = useState(false);

  useEffect(() => {
    setToastDisplay(false);
  }, [])

  useEffect(() => {
    if (props.isDisplay)
      setToastDisplay(true);
    const timeout = setTimeout(async () => {
      setToastDisplay(false);
    }, TIME_DISPLAY_TOASTS);

    return () => {
      clearTimeout(timeout);
    }
  }, [props.isDisplay])

  return <>
    {toastDisplay && <Toast color={props.color}>
      {props.message}
    </Toast>}
  </>
}