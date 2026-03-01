import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
// import Navbar from '@/components/Dashboard/Navbar'
import UserInfo from '@/components/Dashboard/UserInfo'
import SideBar from '@/components/Dashboard/SideBar'
import ItemGrid from '@/components/POS/ItemGrid'
import Receipt from '@/components/POS/Receipt'

import { collection, getDocs, addDoc } from "firebase/firestore"
import { database } from "@/backend/Firebase"
import toast from 'react-hot-toast'

const POS = () => {

  const { user } = useStateContext()
  console.log('user in dashboard', user)
  const [items, setItems] = useState([])
  const [receipt, setReceipt] = useState([])

  // Function to add an item to the receipt
  const addToReceipt = (item) => {
    setReceipt(prev => [...prev, item]) // append item to receipt
  }

  useEffect(() => {
    // function to get all items from firebase
    const getItems = async () => {

      // Get all documents from the "items" collection in Firestore
      const querySnapshot = await getDocs(collection(database, "items"))

      // Convert the query snapshot into an array of JS objects
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // stores the array of items in the React state
      setItems(itemsArray)
    }

    // call the function once when the page first loads
    getItems()
  }, [])

  // Function to handle payment and add receipt to database
  const handlePayment = async () => {
    if (receipt.length === 0) {
      toast.error("No items in receipt")
      return
    }

    const total = receipt.reduce((sum, item) => sum + item.price, 0)

    try {
      // Add a new document to the "receipts" collection in Firestore
      await addDoc(collection(database, "receipts"), {
        receipt: receipt,
        total: total,
        createdAt: new Date(),
        userId: user?.uid || null
      })
      toast.success("Receipt added successfully!")
      setReceipt([])
    } catch (error) {
      console.log(error)
      toast.error("Error adding receipt")
    }

  }


  return (
    <PageWrapper>
      <SideBar/>
      <Maincontent>
        <Header>
          <UserInfo />
        </Header>
        <Content>
          <Title>POS</Title>
          <Section>
            <ItemSection>
              <ItemGrid items={items} addToReceipt={addToReceipt} />
            </ItemSection>
            <ReceiptSection>
              <Receipt receipt={receipt} onPayment={handlePayment}/>
            </ReceiptSection>
          </Section>
        </Content>
      </Maincontent>

    </PageWrapper>
  )
}

const PageWrapper = styled.div`
flex: 1;
display: flex;
// flex-direction: column;
min-height: 100vh;
`;

const Maincontent = styled.main`
flex: 1;
flex-direction: column;
display: flex;
width: 100%;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
`;


const Section = styled.section`
  // flex: 1;
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 80vh;
  gap: 20px;
  background-color: white;
  gap: 20px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 20px auto;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 1000;
  text-align: center;
  // margin-top: 1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.accent};
`

const ItemSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 75%;
  // height: 90%;
  gap: 20px;
  background-color: white;
  gap: 20px;
  border-radius: 20px;
  // border: 1px solid #ccc;
  padding: 20px;
  margin: 20px auto;
`

const ReceiptSection = styled.section`
align-self: center;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 90%;
  gap: 20px;
  background-color: white;
  gap: 20px;
  // border-radius: 20px;
  padding: 20px;
  // margin: 20px auto;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  // height: 100%;
  overflow-y: scroll;
`

export default POS