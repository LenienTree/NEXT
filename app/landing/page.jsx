"use client"

import { EventProvider } from "../../context/EventContext.jsx"
import Header from "../../components/Header.jsx"
import Carousel from "../../components/Carousel.jsx"
import TopEvents from "../../components/TopEvents.jsx"
import Gateway from "../../components/Gateway.jsx"
import TestimonialSection from "../../components/TestimonialSection.jsx"
import ContactPage from "../../components/ContactPage.jsx"
import Footer from "../../components/Footer.jsx"
import { useEffect } from "react"


export default function HomePage() {
  useEffect(() => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODg2NDkyZDg2OWQ1Yzg5MTA2NDVjZWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTM2MzEwMjYsImV4cCI6MTc1Nzk1MTAyNn0.oe4EvWH1G5A4_xgo_CPVVoFv8ytiVJ1WnSzeW2VCSf8')
    
  })
  return (
    
    <EventProvider>
      <div className="min-h-screen overflow-hidden bg-[#102025]">
        <Header pagename={"Home"}/>
        <main className="pt-20">
        
    
      <Carousel />
      <TopEvents/>
      <Gateway/>
      <TestimonialSection/>
      <ContactPage/>
      <Footer/>
     
        </main>
      </div>
    </EventProvider>
  )
}
