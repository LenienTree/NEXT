import React from 'react'
import Header from '../../components/Header.jsx'
import  Footer from "../../components/Footer.jsx"
import AboutHero from "../../components/AboutHero.jsx"
import OurTeam from "../../components/OurTeam.jsx"
import OurStory from "../../components/OurStory.jsx"
import TeamMembersPage from "../../components/TeamMembersPage.jsx"
import Organize from "../../components/Organize.jsx"


const page = () => {
  return (
    <div className="min-h-screen bg-[#102025]">
           <Header pagename={"About"} />
           <AboutHero/>
            <OurTeam/>
            <OurStory/>
            <TeamMembersPage/>
            <Organize/>
           <main className="pt-20">
            <Footer/>
            
           </main>
         </div>
  )
}

export default page