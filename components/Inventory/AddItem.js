import { useState } from "react"
import styled from "styled-components"

const AddItem = ({name, setName, price, setPrice, quantity, setQuantity, addItem}) => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(null) // "add" or "remove"

  return (
    <Wrapper>
      <InputContainer>
        <Input 
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Button onClick={addItem}>
          Add Item
        </Button>
      </InputContainer>
    </Wrapper>

    )
} 

const Wrapper = styled.div`
display: flex;
flex-direction: column; 
// box-shadow: 0 20px 40px rgba(167, 155, 155, 0.1);
background-color: ${({ theme }) => theme.colors.primary};
border-radius: 20px;
` 
const InputContainer = styled.div`
display: flex;
flex-direction: column; 
width: 50%;
margin: 5vh auto;
// box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const Button = styled.button`
padding: 10px;
margin: 5px;
border-radius: 5px;
border: none;
background-color: ${({ theme }) => theme.colors.accent};
color: white;
cursor: pointer;
`



export default AddItem