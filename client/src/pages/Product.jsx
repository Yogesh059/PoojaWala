import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../Newsletter";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { addProductApi } from "../service/productApi";


const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 15px;
  margin-right: 15px;

  @media screen and (max-width: 425px) and (min-width: 325px) {
  display: flex;
  align-item: center;
  justify-content: center;
  flex-direction: column;
  }
  @media screen and (max-width: 768px) and (min-width: 425px) {
  display: flex;
  // align-item: center;
  justify-content: center;
  flex-direction: column;
  }

  `;
const ImgContainer = styled.div`
  flex: 1;
  @media screen and (max-width: 768px) and (min-width: 325px) {
  display: flex;
  align-item: center;
  justify-content: center;
  width: 90vw;
  height: 450px;
  }
  
`;

const Image = styled.img`
  width: 40vw;
  height: 80vh;
  // object-fit: ;
  margin-top: 25px;
  margin-left: 30px;
  @media screen and (max-width: 768px) and (min-width: 325px) {
    display: flex;
    align-item: center;
    justify-content: center;
    margin: 25px 5px 0px;
    height: 450px;
    width: 90vw;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  // margin-left: 10px;
  // padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 20px;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        console.log(res);
        setProduct(res.data);
      } catch (e) {}
    };
    getProduct();
  }, [id]);

  const handleClick = async () => {
    // update cart
    const data = localStorage.getItem("user");
    console.log("data ,iss ", data);
    if (!data) {
      navigate("/login");
    } else {
      const data = await addProductApi({
        userId: JSON.parse(localStorage.getItem("user"))._id,
        productId: id,
        size: size,
        pricePerItem: product.price,
        // quantity:quantity
      });
      if (data) {
        window.location.reload();
      }
      alert("An item has been added to Cart");
    }
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Pandit Preference</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Button onClick={handleClick}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
