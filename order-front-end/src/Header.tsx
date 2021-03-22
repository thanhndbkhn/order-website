import React from "react";
import { Link } from "react-router-dom";
import { HeaderStyle, ItemNav } from "./components/style/Header";

const Header: React.FC = () => {
  return (
    <HeaderStyle>
      <ItemNav>
        <Link to="/">
          Home
          </Link>
      </ItemNav>
      <ItemNav>
        <Link to="/order">
          Order
          </Link>
      </ItemNav>
    </HeaderStyle>
  )
}

export default Header;
