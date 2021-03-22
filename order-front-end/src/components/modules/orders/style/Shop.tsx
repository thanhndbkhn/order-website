import styled from 'styled-components'

export const ListItemProduct = styled.div`
  width: 60%;
  float: left;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  @media (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`
export const OrderList =styled.div`
  width: 40%;
  float: right;
  @media (max-width: 1024px) {
    float: none;
    width: 100%;
  }
`
export const CardProduct = styled.div`
  width: 25%;
  flex: auto;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
`
export const ProductWrapper = styled.div`
  border: 1px solid #d8d8b6;
  overflow: hidden;
  margin-bottom: 30px;
  position: relative;
  padding: 5px;
  text-align: center;
  h2 {
    color: #fe980f;
  }
  img {
    width: 100%;
  }
`

