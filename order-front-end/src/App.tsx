import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Header from './Header';
import Shop from './components/modules/orders/shop/Shop';
import OrderList from './components/modules/orders/order/OrderList';
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  min-width: 768px;
  @media (max-width: 1024px) {
    margin-bottom: 20px;
    width: 100%;
    min-width: unset;
  }
`

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
          <Header />
          <Switch>
            <Route path="/" exact component={Shop} />
            <Route path="/order" >
              <OrderList />
            </Route>
          </Switch>
      </Wrapper >
    </Router>
  );
}

export default App;
