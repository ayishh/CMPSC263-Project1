import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
// import Navbar from '@/components/Dashboard/Navbar'
import SideBar from '@/components/Dashboard/SideBar'
import UserInfo from '@/components/Dashboard/UserInfo'
import Footer from '@/components/LandingPage/Footer'
import { collection, getDocs, query, orderBy} from "firebase/firestore"
import { database } from "@/backend/Firebase"
import { Toaster, toast } from "react-hot-toast"
import SalesHistory from '@/components/Sales/SalesHistory'
import router from 'next/router'


const Sales = () => {
  const [history, setHistory] = useState([])
  

  const { user } = useStateContext()
  

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    }
  }, [user])

  console.log('user in dashboard', user)

  // Sort receipts by date created
  const q = query(
    collection(database, "receipts"),
    orderBy("createdAt", "desc"));
  
  const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
      setIsMounted(true)
  }, [])

  useEffect(() => {
    const getHistory = async () => {

      const querySnapshot = await getDocs(q)

      // Convert the query snapshot into an array of JS objects
      const salesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }))

      setHistory(salesArray)
    }

    getHistory()
  }, [])


  return (
    <PageWrapper>
      <SideBar/>
      <Maincontent>
        <Header>
          <UserInfo />
        </Header>
        <Content>
          <Title>Sales</Title>
          <Section>
            {isMounted && <SalesHistory history={history} />}
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
export default Sales