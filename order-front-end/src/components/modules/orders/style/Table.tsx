
import styled from 'styled-components'

export const TableOrderItem = styled.table`
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  margin-bottom: 20px;
  thead {
    tr {
      background: #fe980f;
      color: #fff;
      font-size: 1.2rem;
      font-family: "Roboto", sans-serif;
      font-weight: normal;
      border-bottom: 1px solid#F7F7F0;
      height: 51px;
      padding-left: 5px;
    }
  }
  tbody {
    img {
      width: 110px;
    }
  }
  p {
    color: #363432;
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    text-decoration: none;
    font-weight: normal;
  }
`
export const TableOrderList = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  color: #697b92;
  tr {
    border-bottom: 1px solid #e6e9ec;
  }
  th {
    font-size: 1.2rem;
    color: black;
    text-align: left;
    font-weight: 400;
    padding: 1rem;
    white-space: nowrap;
  }

  td {
    vertical-align: middle;
    padding: 1.5rem 1rem;
    white-space: nowrap;
    font-size: 1.2rem;
    font-weight: normal;
  }
`
