import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {loginUser, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import { Toaster, toast } from "react-hot-toast"

import Navbar from '@/components/Dashboard/Navbar'
import Footer from '@/components/LandingPage/Footer'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()


  async function handleLogin(){
    try{
      const loggedInUser = await loginUser(email, password, setUser)
      setUser(loggedInUser)
      router.push('/dashboard')
    }catch(err){
      console.log('Error Logging In', err)
      alert('Login Failed. Please check your email and password and try again.')
    }
  }

  return (
    <PageWrapper>
    {/* <Navbar/> */}
    <Section>
        <LeftSide>
          {/* <Image src='/assets/login-illustration.png' alt='Login Illustration' width={400} height={400}/> */}
          <StyledImage src='/login.png' alt='Login Illustration' style={{ width: '80%', height: 'auto' , hover: 'scale(1.1)' }}/>
        </LeftSide>

        <RightSide>
          <TitleSection>
            <Header>Hello again!</Header>
            <SubHeader>Sign in to your account and let's get started</SubHeader>
          </TitleSection>
          
          <InputSection>
            {/* <InputTitle>Email</InputTitle> */}
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputSection>

          <InputSection>  
            {/* <InputTitle>Password</InputTitle> */}
            <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>
          </InputSection>

          <MainButton onClick={handleLogin}>Login</MainButton>

          <SignUPSection>
            <UserAgreementText>Don't have an account? <UserAgreementSpan href='/auth/signup'>Sign Up</UserAgreementSpan></UserAgreementText>
          </SignUPSection>
          
        </RightSide>

    </Section>
    {/* <Footer/> */}
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
background-color: white;
`;

const Section = styled.section`
  display: flex;
  width: 90%;
  max-width: 1800px;
  gap: 20px;
  height: 90vh;
  background-color: white;
  // margin: 10vh auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  padding: 20px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 55%;
  border-radius: 8px;
  align-items: center;
  padding: 60px;
`

const StyledImage = styled.img`
  width: 80%;
  height: auto;
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(5deg) scale(1.05);
  }
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: ${({ theme }) => theme.colors.primary}  ;
  padding: 20px;
  border-radius: 8px;
`

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  // margin-top: 10px;
`;

const SignUPSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;


const TitleSection = styled.div`
  margin-top: 30vh;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  // margin-top: 10px;
`;

const Header = styled.h1`
  font-size: 2rem; 
  color: white;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeader = styled.h2`
  color: white;
  font-size: 1rem;
  font-weight: normal;
  text-align: center;
  margin-top: 0;
`;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid white;
  margin: 2px 0 15px 0;
  align-self: center;
  background-color: white;
`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 1.1rem;
  margin : 5px 0 5px 0;
`;

const MainButton = styled.button`
  color: black;
  font-size: 16px;
  width: 30%;
  border-radius: 5px;
  border: ${({ theme }) => `1px solid ${theme.colors.accent}`};
  align-self: center;
  margin: 20px;
  background-color: white;
  // box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  padding: 8px 10px;
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: white;
  width: 80%;
  align-self: center;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)` 
  color: ${({ theme }) => theme.colors.accent};
`;


export default Login