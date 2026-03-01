import styled from "styled-components"
import { useState } from "react"


const InventoryTable = ({items, deleteItem}) => {
    return (
    <>
    <Title>Inventory List</Title>

    <TableContainer>
        <Table>
        <thead>
            <tr>
            <Th>Name</Th>
            <Th style={{ width: "20%" }}>Price</Th>
            <Th style={{ width: "10%" }}> Quantity</Th>
            <Th style={{ width: "10%" }}>Action</Th>
            </tr>
        </thead>

        <tbody>
            {items.map(item => (
            <tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>${item.price}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                    <ButtonContainer>
                        <Button onClick={() => deleteItem(item.id)} style={{ backgroundColor: "red" }}>
                            Delete
                        </Button>
                        <Button onClick={() => alert("Edit functionality coming soon!")}   >
                            Edit
                        </Button>
                    </ButtonContainer>
                </Td>
            </tr>
            ))}
        </tbody>
        </Table>
    </TableContainer>
    </>
    

    )
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 1000;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent}; 
`


const TableContainer = styled.div`
width: 90%;
margin: 1vh auto;
background-color: #white;
border-radius: 10px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
//   margin-top: 1px;
`

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: left;
  text-align: center;
`

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #white;
`
const ButtonContainer = styled.div`
display: flex;
gap: 10px;
justify-content: center;
`

const Button = styled.button`
padding: 5px 10px;
border-radius: 5px;
border: none;
background-color: ${({ theme }) => theme.colors.primary};
color: white;
cursor: pointer;
`


export default InventoryTable