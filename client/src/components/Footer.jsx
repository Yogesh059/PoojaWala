import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #ffffff;
  background-color: #000000;
`;

const Left = styled.div`
  margin: 0 30px 0;
`;

const Wrapper1 = styled.div``;

const Heading = styled.h2`
  display: flex;
  align-item: center;
  justify-content: left;
`;
const Map = styled.div``;

const StyledIframe = styled.iframe``;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;
const SocialIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #ebebeb;
  border-radius: 50%;
  font-size: 30px;
  color: black;
  transition: all 0.5s;
  cursor: pointer;

  &:hover::before,
  &:active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fa7654;
    transition: all 0.5s;
    transform: scale(0.9);
    z-index: -1;
  }

  &:hover {
    color: #fa2a1f;
    box-shadow: 0 0 5px #fa7654;
    text-shadow: 0 0 5px #fa7654;
  }
`;



const Center = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30px 0;
`;
const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
  // margin-top: -10px;
`;
const ListLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: -40px;
`;
const ListRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-left: 20px;
`;
const ListItem = styled.li`
  margin: 10px 0 10px;
`;

const Right = styled.div`
  margin: 0 30px 0;
`;
const ContactItem = styled.div`
  margin: 10px 0 10px;
`;
const Payment = styled.img`
  margin-top: 10px;
`;

const Footer = () => {
  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleAddressClick = () => {
    alert("Department of Holistic Education");
  };
  return (
    <Container>
      <Wrapper1>
        <Left>
          <Heading>Find us on Google Maps here</Heading>
          <Map>
            <StyledIframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.6606253608606!2d76.70608500958036!3d30.699823374494194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef39a32ed3c1%3A0x9ff15a51ad5117e9!2sDepartment%20of%20Holistic%20Education!5e0!3m2!1sen!2sin!4v1707117984398!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></StyledIframe>
          </Map>
          <SocialContainer>
            <SocialIcon color="#ffffff">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="#ffffff">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="#ffffff">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="#ffffff">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
      </Wrapper1>

      <Center>
        <Heading>Useful Links</Heading>
        <List>
          <ListLeft>
            <ListItem>Home</ListItem>
            <ListItem>Basket</ListItem>
            <ListItem>Category</ListItem>
            <ListItem>category Item</ListItem>
          </ListLeft>
          <ListRight>
            <ListItem>Pooja</ListItem>
            <ListItem>Rituals</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Terms</ListItem>
          </ListRight>
        </List>
      </Center>
      <Right>
        <Heading>Contact</Heading>
        <ContactItem
          style={{ color: "red" }}
          onClick={() => handleAddressClick()}
        >
          <Room style={{ marginRight: "10px" }} /> Department of Holistic
          Education
        </ContactItem>
        <ContactItem onClick={() => handlePhoneClick("+91 9518100916")}>
          <Phone style={{ marginRight: "10px" }} /> +91 9518100916
        </ContactItem>
        <ContactItem onClick={() => handlePhoneClick("+91 8119963399")}>
          <Phone style={{ marginRight: "10px" }} /> +91 8119963399
        </ContactItem>
        <ContactItem onClick={() => handleEmailClick("ykj131@gmail.com")}>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          er.yogeshjangra1@gmail.com
        </ContactItem>
        <ContactItem
          onClick={() => handleEmailClick("manisaroychowdhury@gmail.com")}
        >
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          manisaroychowdhury@gmail.com
        </ContactItem>
        <Payment src="http://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
