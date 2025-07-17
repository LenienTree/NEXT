"use client"

import { EventProvider } from "../../context/EventContext.jsx"
import Header from "../../components/Header.jsx"
import Carousel from "../../components/Carousel.jsx"
import TopEvents from "../../components/TopEvents.jsx"
import Gateway from "../../components/Gateway.jsx"
import TestimonialSection from "../../components/TestimonialSection.jsx"
import ContactPage from "../../components/ContactPage.jsx"
import Footer from "../../components/Footer.jsx"


export default function HomePage() {
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
