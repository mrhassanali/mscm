import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  background-color: #222;
  color:white;
  font-size:1.9rem;
  height:6rem;
  line-height:5rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      Medicine Supply Chain Management
    </FooterContainer>
  );
};

export default Footer;
