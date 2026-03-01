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
import Sidebar from '@/components/Dashboard/SideBar'
import UserInfo from '@/components/Dashboard/UserInfo'
import router from 'next/router'

const Inventory = () => {

  const { user } = useStateContext()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  
  const [items, setItems] = useState([])

  const [showAddItem, setShowAddItem] = useState(false)

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
    <PageWrapper>
      <Sidebar/>
      <div><Toaster/></div>
      <Maincontent>
        <Header>
          <UserInfo />
        </Header>
        <Content>
          <Title>Inventory</Title>
          <Section>
            {/* Add item button */}
            <ToggleButton onClick={() => setShowAddItem(!showAddItem)}>
              {showAddItem ? "Close" : "Add Item"}
            </ToggleButton>
            {showAddItem && (
              <AddItem
                name={name}
                price={price}
                quantity={quantity}
                setName={setName}
                setPrice={setPrice}
                setQuantity={setQuantity}
                addItem={addItem}
              />
            )}
            {/* <AddItem name={name} price={price} quantity={quantity} setName={setName} setPrice={setPrice} setQuantity={setQuantity} addItem={addItem}/> */}
            <Table items={items} deleteItem={deleteItem}/>
          </Section>
        </Content>
      </Maincontent>
    </PageWrapper>
  )
}



const PageWrapper = styled.div`
flex: 1;
display: flex;
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
  display: flex;
  flex-direction: column;
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

const ToggleButton = styled.button`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  align-self: flex-start;
`;
export default Inventory