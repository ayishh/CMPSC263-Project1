import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
// import Navbar from '@/components/Dashboard/Navbar'
import Footer from '@/components/LandingPage/Footer'

const POS = () => {

  const { user } = useStateContext()  

  const router = useRouter()


  // useEffect(() => {
  //   if(!user){
  //     router.push('/')
  //   }else{

  //   }
  // }, [user])

  console.log('user in dashboard', user)




  return (
    <PageWrapper>
    {/* <Navbar/>  */}
      <Section>    
      <Title>Sales History</Title>
      </Section>
    <Footer/>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`;

const Section = styled.section`
width: 100%;
// height: 70vh;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 1000;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export default POS