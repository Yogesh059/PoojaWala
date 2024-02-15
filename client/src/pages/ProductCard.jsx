import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProduct } from "../service/productApi";
import { Add, DeleteForever, Remove } from "@material-ui/icons";
import { mobile } from '../responsive';
import { publicRequest } from "../requestMethods";

const ProductContainer = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  flex-wrap;

  // @media screen and (max-width: 425px) and (min-width: 325px) {
  //   display: flex;
  //   flex-direction: column;
  // }
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
   
  @media screen and (max-width: 425px) and (min-width: 325px) {
    height: 100px;

  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const ProductId = styled.span`
  font-size: 14px;
  color: #666;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span`
  font-size: 14px;
  color: #666;
`;

const PriceDetail = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;

const Icon = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  height: 20px;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

const ProductCart = ({ product, getUserProductsList }) => {
  const [pro, setPro] = useState();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const data = await getProduct(product.productId);
    setPro(data);
  };

  const deleteProduct = async () => {
    try {
      const res = await publicRequest.delete(`carts/${product.productId}`);
      if (res) {
        alert("An item has been deleted");
        getUserProductsList();
        window.location.reload();
      }
    } catch (e) {
      console.error("Error deleting product", e);
    }
  };

  return (
    <ProductContainer>
      <ProductDetail>
        <Image src={pro?.img} />
        <Details>
          <ProductName>{pro?.title}</ProductName>
          <ProductId>ID: {product.productId}</ProductId>
          <ProductColor color={pro?.color} />
          <ProductSize>Pandit Preference: {product.size}</ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
      {/* <ProductTotal>Total: ₹ {pro?.price * product.quantity}</ProductTotal> */}
        <ProductPrice>Total: &nbsp;&nbsp;₹ {pro?.price * product.quantity}</ProductPrice>
      </PriceDetail>
      <Icon>
        <DeleteForever onClick={deleteProduct} />
      </Icon>
    </ProductContainer>
  );
};

export default ProductCart;
