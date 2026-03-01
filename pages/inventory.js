import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
// import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import AddItem from '@/components/Inventory/AddItem'
import Table from '@/components/Inventory/Table'
import { database } from '@/backend/Firebase'
import { collection, addDoc, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { Toaster, toast } from "react-hot-toast"

const Inventory = () => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  
  const [items, setItems] = useState([])

  const addItem = async () => {
    try {
      // Add a new document to the "items" collection in Firestore
      await addDoc(collection(database, "items"), {
        pid : Math.floor(Math.random() * 1000000), // Generate a random product ID
        name: name,
        price: Number(price),
        quantity: Number(quantity),
        createdAt: new Date()
      })

      // alert("Item added!")
      toast.success("Item added successfully!")

      // Clear the input fields
      setName("")
      setPrice("")
      setQuantity("")

      // Refresh the list of items after adding a new one
      getItems()
    } catch (error) {
      console.log(error)
    }
  }

  const getItems = async () => {
    // Get all documents from the "items" collection in Firestore
    const querySnapshot = await getDocs(collection(database, "items"))

    // Convert the query snapshot into an array of objects
    const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    // Set the state with the array of items
    setItems(itemsArray)
    }
  
  const deleteItem = async (id) => {
    await deleteDoc(doc(database, "items", id))
    toast.success("Item deleted successfully!")
    getItems()
  }


    // Fetch items when page loads 
    useEffect(() => {
        getItems()
    }, [])  

  return (
    <>
      <div><Toaster/></div>
      <Title>Inventory</Title>
        <AddItem name={name} price={price} quantity={quantity} setName={setName} setPrice={setPrice} setQuantity={setQuantity} addItem={addItem}/>
        <Table items={items} deleteItem={deleteItem}/>
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


export default Inventory