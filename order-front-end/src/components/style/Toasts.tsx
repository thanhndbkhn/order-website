import styled from 'styled-components';

export const Toast = styled.div<any>`
  width: 50%;
  height: auto;
  top: 10px;
  position: fixed;
  left: 35%;
  margin-left: -100px;
  color: #F0F0F0;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  border-radius: 7px;
  box-shadow: 0px 0px 24px -1px rgb(56 56 56);
  z-index: 9;
  background-color: ${props => props.color || '#35bc7a'};
`