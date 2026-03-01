import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
// import Navbar from '@/components/Dashboard/Navbar'
import Footer from '@/components/LandingPage/Footer'
import UserInfo from '@/components/Dashboard/UserInfo'
import Sidebar from '@/components/Dashboard/SideBar'


const Dashboard = () => {

  const { user } = useStateContext()  

  const router = useRouter()


  useEffect(() => {
    if(!user){
      router.push('/')
    }else{

    }
  }, [user])

  console.log('user in dashboard', user)




  return (
    <PageWrapper>
    {/* <Navbar/>  */}
    <Sidebar/>
    <Maincontent>
        <Header>
          <UserInfo />
        </Header>
        <Content>
          <Title>Welcome to the Dashboard!</Title>
          <Section>
          
          </Section>
        </Content>
    </Maincontent>
    {/* <Footer/> */}
    </PageWrapper>
  )
}


//STYLED COMPONENTS

const PageWrapper = styled.div`
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
  width: 95%;
  height: 90%;
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
`;


export default Dashboard