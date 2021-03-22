import { combineReducers } from 'redux';
import orders, {OrderState} from '../components/modules/orders/reducers/orders.reducers';

const rootReducer = combineReducers<IRootState>({
    orders
})

export default rootReducer;
export interface IRootState {
    orders: OrderState
}