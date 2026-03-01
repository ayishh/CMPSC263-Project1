import { useState } from "react"
import styled from "styled-components"

const AddItem = ({name, setName, price, setPrice, quantity, setQuantity, addItem}) => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(null) // "add" or "remove"

  return (
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
    </InputContainer>)
} 

const InputContainer = styled.div`
display: flex;
flex-direction: column; 
width: 50%;
margin: 5vh auto;
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
background-color: #034078;
color: white;
cursor: pointer;
`



export default AddItem