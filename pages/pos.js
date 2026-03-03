import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStateContext } from '@/context/StateContext'
import UserInfo from '@/components/Dashboard/UserInfo'
import SideBar from '@/components/Dashboard/SideBar'
import ItemGrid from '@/components/POS/ItemGrid'
import Receipt from '@/components/POS/Receipt'
import { collection, getDocs, addDoc } from "firebase/firestore"
import { database } from "@/backend/Firebase"
import { Toaster, toast } from "react-hot-toast"
import router from 'next/router'
import {loadStripe} from '@stripe/stripe-js'

const POS = () => {

  const { user } = useStateContext()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user])

  console.log('user in dashboard', user)
  const [items, setItems] = useState([])
  const [receipt, setReceipt] = useState([])
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

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

  // Function to add an item to the receipt
  const addToReceipt = (item) => {
    setReceipt(prev => [...prev, item]) // append item to receipt
  }

  // Function to handle payment and add receipt to database (no email sent)
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
        userId: user.email?user.email.split("@")[0]
    : "Unknown"
      })
      toast.success("Transaction recorded successfully!")
      setReceipt([])
    } catch (error) {
      console.log(error)
      toast.error("Error adding receipt")
    }

  }

  // Function to send receipt email
  const sendReceiptEmail = async () => {
    if (receipt.length === 0) return

    if (!customerEmail) {
      toast.error("Please enter a valid email")
      return
    }

    const total = receipt.reduce((sum, item) => sum + item.price, 0)

    try {
      // Add a new document to the "receipts" collection in Firestore
      await addDoc(collection(database, "receipts"), {
        receipt: receipt,
        total: total,
        createdAt: new Date(),
        userId: user.email?user.email.split("@")[0]
    : "Unknown"
      })
    
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: customerEmail,
        receipt,
      }),
    })
    toast.success("Payment successful & email sent successfully!")
    setReceipt([])
    setCustomerEmail("")
    setShowEmailModal(false)
  } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  // Function to open email modal to enter customer email
  const openEmailModal = () => {
    if (receipt.length === 0) {
      toast.error("No items in receipt")
      return
    }
    setShowEmailModal(true)
  }

  // Function to remove last item
  const voidLastItem = () => {
    if (receipt.length === 0) {
      toast.error("No item to void")
      return
    }

    setReceipt(prev => prev.slice(0, -1))
  }

  // Function to cancel entire transaction
  const cancelTransaction = () => {
    if (receipt.length === 0) {
      toast.error("No active transaction")
      return
    }

    setReceipt([])
    toast.success("Transaction cancelled")
  }



  return (
    <PageWrapper>
      <div><Toaster/></div>
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
              <Receipt 
              receipt={receipt} 
              onPayment={handlePayment} 
              onSendReceipt={openEmailModal}
              onVoidLast={voidLastItem}
              onCancel={cancelTransaction}/>
            </ReceiptSection>
          </Section>
        </Content>
      </Maincontent>

      {showEmailModal && (
        <ModalOverlay>
          <ModalBox>
            <h3>Enter Customer Email</h3>

            <Input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="customer@email.com"
            />

            <ModalButtons>
              <MButton onClick={() => setShowEmailModal(false)}>
                Cancel
              </MButton>

              <MButton onClick={sendReceiptEmail}>
                Confirm & Send
              </MButton>
            </ModalButtons>
          </ModalBox>
        </ModalOverlay>
      )}

    </PageWrapper>
  )
}




const PageWrapper = styled.div`
display: flex;
height: 100vh;
overflow: hidden;
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
  flex: 1;
  width: 95%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  gap: 20px;
  overflow: hidden;
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  // margin-top: 1rem;
  // padding: 0.5rem;
`

const MButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
`



export default POS