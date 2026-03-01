import React from 'react';
import styled from 'styled-components';


const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <InputSection>
      <InputTitle>{label}</InputTitle>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </InputSection>
  );
};

export default InputField;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const InputTitle = styled.label`
    font-size: 1.1rem;
    margin-bottom: 5px;
`;  

const Input = styled.input`
    font-size: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;