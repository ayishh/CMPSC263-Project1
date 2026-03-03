import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/auth/login')
  },[])


  return null
  } 


