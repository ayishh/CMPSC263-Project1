import React from 'react';
import Link  from 'next/link';
import { IoMdHome } from 'react-icons/io'; // Importing a home icon from react-icons
import styled from 'styled-components';

const Home = () => {
  return (
    <Square href="/dashboard">
      <IoMdHome />
    </Square>
  );
};

const Square = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
width: 50px; // Adjust the size as needed
height: 50px; // Adjust the size as needed
background-color: #ECCE8E;
color: white;
border-radius: 4px; // Adjust for square or rounded corners
text-decoration: none;
  
  svg {
    width: 30px; // Adjust icon size as needed
    height: 30px; // Adjust icon size as needed
  }

  &:hover {
    background-color: #527596; // Change color on hover 
  }
`;

export default Home;
