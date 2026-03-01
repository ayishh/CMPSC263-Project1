import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>

        <LeftContainer>
          <FooterText>© {new Date().getFullYear()} CMPSC 263</FooterText>
        </LeftContainer>

        <RightContainer>
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </RightContainer>

      </FooterContainer>

      <FooterContainer>
        <SocialIcon href="#" aria-label="Facebook">Facebook</SocialIcon>
        <SocialIcon href="#" aria-label="Twitter">Twitter</SocialIcon>
        <SocialIcon href="#" aria-label="Instagram">Instagram</SocialIcon>
      </FooterContainer>
    </FooterSection>
  );
};

const clickButton = styled.button``;

const FooterSection = styled.footer`
margin-top: auto;
background-color: #034078;
padding: 1rem 2rem;
display: flex;
align-items: center;
flex-direction: column;
`;

const FooterContainer = styled.div`
width: 80%;
display: flex;
justify-content: center;
align-items: center;
gap: 40px;
`;

const LeftContainer = styled.div``;

const FooterText = styled.p`
color: #fff;
font-size: 1rem;
`;

const CenterContainer = styled.div`
display: flex;
gap: 20px;`;

const RightContainer = styled.div`
display: flex;
gap: 10px;
`;

const Link = styled.a`
text-decoration: none;
color: #fff;
`;

const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: #dde6f0;
  }
  font-size: 1rem;
`;

export default Footer;
