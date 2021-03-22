import React from 'react';
import { Product } from '../interface/product.interface';
import { Button } from '../style/Button';
import { CardProduct, ProductWrapper } from '../style/Shop';


export interface IProductCardProps {
  product: Product;
  addProductToOrder: (product: Product) => void;
}

export const ProductCard: React.FC<IProductCardProps> = (props) => {

  const addProductToOrder = () => {
    props.addProductToOrder(props.product);
  }
  return (
    <>
      {props.product &&
        <CardProduct>
          <ProductWrapper>
              <img src={props.product.imageUrl} alt=""/>
              <h2>${props.product.price}</h2>
              <p>{props.product.productName}</p>
              <Button  data-testid={props.product.productId + `id`} onClick={addProductToOrder}>Add to cart</Button>
          </ProductWrapper>
        </CardProduct>
      }
    </>
  )
}