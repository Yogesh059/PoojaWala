import React from 'react';
import styled, { keyframes } from 'styled-components';

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Container = styled.div`
  height: 30px;
  margin-left: 10px;
  background-color: #FA7654;
  color: white;
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
`;

const MarqueeText = styled.div`
  animation: ${marquee} 15s linear infinite;
`;

function Announcement() {
  return (
    <Container>
      <MarqueeText>
        Special Offers on selected pooja! Till 31 March.. All Poojas and Rituals are at Rs. 2100
      </MarqueeText>
    </Container>
  );
}

export default Announcement;
