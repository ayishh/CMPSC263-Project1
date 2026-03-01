import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Home from '@/components/Dashboard/Home'
const Navbar = () => {
  const { setUser } = useStateContext()

  return (
    <Nav>
      {/* <Logo onClick={() => logOut(setUser)} href="/">CMPSC 263</Logo> */}
      <Left>
        <Home/>
      </Left>
      <Center>
        <Title>JUAL</Title>
      </Center>
      <Right>
        <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
        <ButtonLink href="/auth/login">Login</ButtonLink>
      </Right>

    </Nav>
  );
};

const Left = styled.div`
flex: 1;
`;

const Center = styled.div`
position: absolute;
left: 50%;
transform: translateX(-50%);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const Right = styled.div`
// justify-self: end;
display: flex;
gap: 1rem;
`;




const Nav = styled.nav`
background-color: #034078;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 2rem;
width: 100%;
position: relative;
`;

const Logo = styled(Link)`

`;

const NavLinks = styled.div`

`;

const ButtonLink = styled(Link)`
background-color: #ECCE8E;
// border: 2px solid #0A1128;
padding: 10px 15px;
color: #0A1128;
border-radius: 10px;
text-decoration: none;
white-space: nowrap;
color: #white;
&:hover {
  background-color: #0A1128;
  color: white;

`;

export default Navbar;
