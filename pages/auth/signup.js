import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInUse, registerUser} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import Footer from '@/components/LandingPage/Footer'
import { Toaster, toast } from "react-hot-toast"




const Signup = () => {

  const { user, setUser } = useStateContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    console.log('so far so good...')
    const emailResponse = await isEmailInUse(email)
    console.log('email response', emailResponse)
    if(emailResponse.length > 0 ){
        return false;
    }

    return true;
}

  async function handleSignup(){
    const isValidEmail = await validateEmail()
    console.log('isValidEmail', isValidEmail)
    if(!isValidEmail){ return; }
    
    try{
        const newUser = await registerUser(email, password, setUser)
        // await register(email, password, setUser)
        setUser(newUser)
        // router.push('/dashboard')
        // alert('Signup successful! Please log in with your new credentials.')
        toast.success('Signup successful! Please log in with your new credentials.')
    }catch(err){
        console.log('Error Signing Up', err)
    }
  }

  return (
    <PageWrapper>
    <div><Toaster/></div>
    {/* <Navbar/> */}
    <Section>
        <LeftSide>
          <TitleSection>
            <Header>Join us today!</Header>
            <SubHeader>Create an account and start your journey with us</SubHeader>
          </TitleSection>
          <InputSection>
            <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </InputSection>
          <InputSection>
            <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </InputSection>
          <InputSection>
            {/* <InputTitle>Email</InputTitle> */}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </InputSection>
          <InputSection>
            {/* <InputTitle>Password</InputTitle> */}
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>
          </InputSection>
          <InputSection>
            <MainButton onClick={handleSignup}>Sign Up</MainButton>
          </InputSection> 
          <SignUPSection>
              <UserAgreementText>Already have an account? <UserAgreementSpan href='/auth/login'>Login</UserAgreementSpan></UserAgreementText>
          </SignUPSection>
          {/* <Image src='/assets/login-illustration.png' alt='Login Illustration' width={400} height={400}/> */}
        </LeftSide>

        <RightSide>
          <StyledImage src='/signup.png' alt='Signup Illustration' style={{ width: '100%', height: 'auto' , hover: 'scale(1.1)' }}/>
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
  width: 45%;
  background-color: ${({ theme }) => theme.colors.primary}  ;
  padding: 20px;
  border-radius: 8px;
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
  justify-content: center;
  width: 55%;
  border-radius: 8px;
  align-items: center;
  padding: 60px;
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


export default Signup