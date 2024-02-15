import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Badge } from "@material-ui/core";
import {
  Menu as MenuIcon,
  ExitToAppOutlined,
  ShoppingCartOutlined,
  ShoppingBasket,
  WidgetsSharp,
} from "@material-ui/icons";
// import MenuIcon from '@mui/icons-material/Menu';
import { getUserProducts } from "../service/productApi";
import home from "./home.png";
import styled from "styled-components";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Poppins:wght@300&family=Red+Rose&display=swap');
</style>;

const Container = styled.div`
  height: 60px;
  margin-top: -5px;
  margin-bottom: 15px;
`;

const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 425px) and (min-width: 325px) {
    padding: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIconContainer = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  cursor: pointer;
  @media screen and (min-width: 665px) {
    display: none; /* Hide the MenuIconContainer for screen widths up to 786px */
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: 140px;
  display: block;

  @media screen and (max-width: 665px) {
    display: flex;
    align-item: flex-end;
    margin-top: 20px;
    // margin-left: 120px;
    width: 120px;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  text-align: center;

  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const ActionsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 650px) {
    flex: none;
    display: none;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  margin-right: 10px;
  cursor: pointer;
`;

const BoldText = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

const StyledHeading = styled.h1`
  font-family: "Montserrat", sans-serif;
  color: #fa7654;
  // font-weight: bold;
  display: flex;
  align: center;
  justify-content: center;
  margin-left: 300px;

  @media screen and (min-width: 325px) and (max-width: 833px) {
    display: none;
  }
`;

const Navbar = ({ length }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [len, setLength] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getProductItem();
    getSetuser();
  }, []);

  useEffect(() => {
    setLength(length);
  }, [length, len]);

  const getProductItem = async () => {
    const data = await getUserProducts(
      JSON.parse(localStorage.getItem("user"))._id
    );
    setLength(data?.length);
  };

  const getSetuser = () => {
    const user = localStorage.getItem("user");
    setData(user);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerItemClick = (path) => {
    navigate(path);
    handleDrawerClose();
  };

  const handleOrder = () => {
    navigate("/orders");
  };

  const handleClick = () => {
    localStorage.clear();
    setLength(0);
    navigate("/");
    getSetuser();
  };

  const handleCart = () => {
    if (!data) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <Container>
        <Content>
          <LogoContainer>
            <MenuIconContainer>
              <MenuIcon
                style={{ fontSize: "30px" }}
                onClick={handleDrawerOpen}
              />
            </MenuIconContainer>
            <div>
              <Link to="/">
                <LogoImage src={home} className="logo" alt="Home" />
              </Link>
            </div>
          </LogoContainer>
          <TitleContainer>
            <StyledHeading>Pooja Wala</StyledHeading>
          </TitleContainer>
          <ActionsContainer>
            {data ? (
              <IconContainer>
                <ShoppingBasket
                  onClick={handleOrder}
                  style={{ fontSize: "24px" }}
                />
              </IconContainer>
            ) : null}
            <Button onClick={handleCart}>
              <div>
                {data ? (
                  <Badge
                    badgeContent={len}
                    overlap="rectangular"
                    color="primary"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </Badge>
                ) : (
                  <Badge
                    badgeContent={null}
                    overlap="rectangular"
                    color="primary"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </Badge>
                )}
              </div>
            </Button>
            <Link to="/Video">
              <Button>
                <BoldText>Pooja Tutorials</BoldText>
              </Button>
            </Link>
            {!data ? (
              <>
                <Link to="/register">
                  <Button>
                    <BoldText>Register</BoldText>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button>
                    <BoldText>Sign In</BoldText>
                  </Button>
                </Link>
                <Link to="/Video">
                  <Button>
                    <BoldText>Pooja Tutorials</BoldText>
                  </Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleClick}>
                <ExitToAppOutlined style={{ fontSize: "24px" }} />
              </Button>
            )}
          </ActionsContainer>
        </Content>
      </Container>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        style={{ zIndex: "999" }}
      >
        <List>
          {/* <img src={home} className="DrawerLogo" alt="Home" /> */}
          <ListItem button onClick={() => handleDrawerItemClick("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/cart")}>
            <ListItem>
              <div>
                {data ? (
                  <Badge
                    badgeContent={len}
                    overlap="rectangular"
                    color="primary"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </Badge>
                ) : (
                  <Badge
                    badgeContent={null}
                    overlap="rectangular"
                    color="primary"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </Badge>
                )}
              </div>
            </ListItem>
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/register")}>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/login")}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button onClick={() => handleDrawerItemClick("/Video")}>
            <ListItemText primary="Pooja Tutorials" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
