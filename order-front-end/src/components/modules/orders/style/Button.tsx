import styled from 'styled-components'

export const Button = styled.button<any> `
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  float: ${props => props.right ? 'right' : ''};
  background : ${props => props.color || '#e3e4d4'};
`

export const ButtonDelete = styled.button`
  border-radius: 7px;
  padding: 2px 6px 3px;
  text-decoration: none;
  font: 700 21px/20px sans-serif;
  background: #bcd6d13b;
  border: 2px solid #f9f7f7;
  color: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 50%), inset 0 2px 4px rgb(0 0 0 / 30%);
  text-shadow: 0 1px 2px rgb(0 0 0 / 50%);
  transition: background 0.5s;
`
export const ButtonConfirm = styled(Button)`
  background: #2B543A
`
export const ButtonCancel = styled(Button)`
  background: #FF5719
`


