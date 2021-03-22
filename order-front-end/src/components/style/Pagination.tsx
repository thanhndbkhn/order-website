import styled from 'styled-components'
export const PaginationWrap = styled.ul `
  display: inline-block;
  padding: 0;
  margin: 8px 20px 0;
  float: right;
`
export const PaginationItem = styled.li<any>`
  cursor: pointer;
  display: inline;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  background:  ${props => props.active ? '#E8DDDC' : ''};
`