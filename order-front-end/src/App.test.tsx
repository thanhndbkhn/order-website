import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import App from './App';
import { shallow, configure } from 'enzyme';
import Shop from './components/modules/orders/shop/Shop';
import OrderList from './components/modules/orders/order/OrderList';
import OrderDetails from './components/modules/orders/order/OrderDetails';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Dispatch } from 'redux';
import rootReducer from './reducers/rootReducer.reducer';
import thunk from 'redux-thunk';
import { ACTION_TYPES, OrderAction } from './components/modules/orders/reducers/orders.reducers';
import { act } from "react-dom/test-utils";

let store: any = null;
let container: any = null;

beforeEach(() => {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  configure({ adapter: new Adapter() });
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  store = null;
});


it('renders App', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}> <App /> </Provider>, div);
});

it('render List Order', () => {
  const responseMock =
  {
    data:
    {
      order: [
        {
          createdAt: "2021-03-04T15:46:30.257Z",
          orderId: "604100d6b4fbbb0023412d98",
          orderItems: [
            {
              product: {
                imageUrl: "https://demo.themeum.com/html/eshopper/images/home/product3.jpg",
                price: 300,
                productId: "3",
                productName: "Easy Polo 3"
              }, quantity: 1
            }],
          orderStatus: 3,
          totalPrice: 300
        }
      ]
    }
  }
  store.dispatch({
    type: ACTION_TYPES.GET_LIST_ORDER,
    response: responseMock,
  });
  const OrderListComponent = shallow(<Provider store={store}>
    <OrderList />
  </Provider>);
  expect(OrderListComponent).toMatchSnapshot();
});

it('render Order Detail', () => {
  const responseMock =
  {
    data:
    {
      createdAt: "2021-03-04T15:46:30.257Z",
      orderId: "604100d6b4fbbb0023412d98",
      orderItems: [
        {
          product: {
            imageUrl: "https://demo.themeum.com/html/eshopper/images/home/product3.jpg",
            price: 300,
            productId: "3",
            productName: "Easy Polo 3"
          }, quantity: 1
        }],
      orderStatus: 3,
      totalPrice: 300,
      userId: "1"
    }
  }

  store.dispatch({
    type: ACTION_TYPES.GET_DETAIL_ORDER,
    response: responseMock,
  });
  const orderDetailComponent = shallow(<Provider store={store}>
    <OrderDetails orderId={"604100d6b4fbbb0023412d98"} />
  </Provider>);
  expect(orderDetailComponent).toMatchSnapshot();
})

it('click order Order', () => {
  act(() => {
    ReactDOM.render(<Provider store={store}>
      <Shop />
    </Provider>, container);
  });

  // Click add product to Order
  const button = container.querySelector("[data-testid='1id']");
  expect(button?.innerHTML).toBe("Add to cart");
  act(() => {
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Get Button Order
  const buttonOrder = container.querySelector("[data-testid='order']");
  expect(buttonOrder?.innerHTML).toBe("Order");

  // Click button Order => Order Product1.
  act(() => {
    buttonOrder?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
})


it('renders Shop', () => {
  const responseMock =
  {
    message: 'Order Create Success',
  }
  store.dispatch({
    type: ACTION_TYPES.CREATE_ORDER,
    response: responseMock,
  });
  const shopComponent = shallow(<Provider store={store}>
    <Shop />
  </Provider>);
  expect(shopComponent).toMatchSnapshot();
});

it('click Name Order => Show Detail Order', () => {
  const responseMock =
  {
    data: [
        {
          createdAt: "2021-03-04T15:46:30.257Z",
          orderId: "604100d6b4fbbb0023412d98",
          orderItems: [
            {
              product: {
                imageUrl: "https://demo.themeum.com/html/eshopper/images/home/product3.jpg",
                price: 300,
                productId: "3",
                productName: "Easy Polo 3"
              }, quantity: 1
            }],
          orderStatus: 3,
          totalPrice: 300
        }
      ]
  }
  store.dispatch({
    type: ACTION_TYPES.GET_LIST_ORDER,
    response: responseMock,
  });
  act(() => {
    ReactDOM.render(<Provider store={store}>
      <OrderList />
    </Provider>, container);
  });
  // Name Product => show detail Order
  const listNameProduct = container.querySelector("[data-testid='604100d6b4fbbb0023412d98']");
  expect(listNameProduct.getElementsByTagName("a").item(0).textContent).toBe("Easy Polo 3");
})

import orderReducer from './components/modules/orders/reducers/orders.reducers'

it('Test Reducer Get order detail', () => {
  const responseMock = {
    data: {
        totalPrice: 300,
        userId: 1,
        orderItems: []
      }
  }
  const newStateOrder = orderReducer(undefined, {
    type: ACTION_TYPES.GET_DETAIL_ORDER,
    response: responseMock
  });
  expect(newStateOrder?.orderDetails).toEqual(responseMock.data);
})

it('Test Reducer Create Order', () => {
  const responseMock = {
    data: {
      totalPrice: 300,
      userId: 1,
      orderItems: []
    }
  }
  const newStateOrder = orderReducer(undefined, {
    type: ACTION_TYPES.CREATE_ORDER,
    response: responseMock
  });
  expect(newStateOrder.actionStatus.status).toEqual(OrderAction.CreateSuccess);
})

it('Test Reducer Cancel Order', () => {
  const order = {
    data: {
      totalPrice: 300,
      userId: 1,
      orderItems: []
    }
  }
  const newStateOrder = orderReducer(undefined, {
    type: ACTION_TYPES.CANCEL_ORDER,
    response: order
  });
  expect(newStateOrder.actionStatus.status).toEqual(OrderAction.CancelSuccess);
})
