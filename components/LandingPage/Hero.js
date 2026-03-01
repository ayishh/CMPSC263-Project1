import React from 'react';
import styled from 'styled-components';
import InputField from './inputField';

const Hero = ({text}) => {
  return (
    <div>
      {/* <Title>JUAL</Title> */}
      <InputField label="Email" type="email" placeholder="Enter your email" value="" onChange={() => {}} />
    </div>
  );
};

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0A1128;
  text-align: center;
  margin-top: 50px;
`;

export default Hero;