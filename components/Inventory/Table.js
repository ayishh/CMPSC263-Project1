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
            <Th>Price</Th>
            <Th style={{ width: "15%" }}> Quantity</Th>
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
                        <Button onClick={() => deleteItem(item.id)}>
                            Delete
                        </Button>
                        <Button onClick={() => alert("Edit functionality coming soon!")}>
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
  font-size: 3rem;
  font-weight: 1000;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`


const TableContainer = styled.div`
width: 90%;
margin: 5vh auto;
background-color: #f9f9f9;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #034078;
  color: white;
  text-align: left;
  text-align: center;
`

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
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
background-color: #034078;
color: white;
cursor: pointer;
`


export default InventoryTable