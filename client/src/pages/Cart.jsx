import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from '../requestMethods';
import { useNavigate, Link } from 'react-router-dom'
import { getUserProducts } from '../service/productApi'
import Summary from './Summary'
import ProductCart from './ProductCard'

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;

  @media only screen and (max-width: 1024px) {
    padding: 10px;
  }
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => props.type === "filled" ? "black" : "tranparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: block;
  }
`;

const TopText = styled.span`
  text-decoration: none;
  cursor: pointer;
  margin: 0px 10px;
  font-size: 20px;
  color: teal;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex:3;
  display: flex;
  flex-wrap: wrap;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex:2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius:50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    const [productList, setProductList] = useState();
    const [user, setUser] = useState();

    let totalPrice = 0;

    const onToken = (token) => {
        setStripeToken(token);
    };

    const userId = JSON.parse(localStorage.getItem("user"))._id

    useEffect(() => {
        getUserProductsList();
    }, [])

    const getUserProductsList = async () => {
        const list = await getUserProducts(userId);
        const res = await publicRequest.get(`/users/find/${userId}`);
        setUser(res.data.username);
        setProductList(list);
    }

    return (
        <Container>
            <Navbar length={productList?.length} />
            <Announcement />
            <Wrapper>
                <Title>🕉️ Your Divine Collection</Title>
                <Top>
                    <Link to="/">
                        <TopButton>Explore More Spiritual Offerings</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>🕉️ Divine Collection ({productList?.length})</TopText>
                    </TopTexts>
                </Top>
                <Bottom>
                    <Info>
                        {
                            productList?.map((product, index) => (
                                <React.Fragment key={index}>
                                    {
                                        <div style={{ display: "none" }}> {totalPrice += product.quantity * product.pricePerItem}</div>
                                    }
                                    <ProductCart key={product._id} product={product} totalPrice={totalPrice} getUserProductsList={getUserProductsList} />
                                    <Hr key={`hr-${index}`} />
                                </React.Fragment>
                            ))
                        }
                    </Info>
                    <Summary totalPrice={totalPrice} productList={productList} user={user} />
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
