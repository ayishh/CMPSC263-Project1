import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
export default function Home() {
  return (
    <>
      <PageWrapper>
        <HeaderSection>
          <Navbar />
          <Hero />
        </HeaderSection>
        <Footer />
      </PageWrapper>
    </>
  )
}

const HeaderSection = styled.div`
display: flex;
flex-direction: column;
text-align: center;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

