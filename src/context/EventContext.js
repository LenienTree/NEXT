"use client"

import { createContext, useContext, useState } from "react"

const EventContext = createContext()

export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}

export const EventProvider = ({ children }) => {
  const [events] = useState([
    {
      id: 1,
      title: "BNB HACK KERALA",
      subtitle: "Build. Compete. Win. $100K+ in rewards await at Kerala's biggest Web3 hackathon!",
      brand: "BNB CHAIN",
      coHost: "Fluxor",
      image: "https://via.placeholder.com/600x400/1a1a1a/ffd700?text=BNB+HACK",
      qrCode: "https://via.placeholder.com/120x120/ffffff/000000?text=QR",
      registrationLink: "#",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "ETHEREUM SUMMIT",
      subtitle: "Join the future of decentralized finance. Connect with industry leaders and innovators.",
      brand: "ETHEREUM",
      coHost: "ConsenSys",
      image: "https://via.placeholder.com/600x400/1a1a1a/627eea?text=ETHEREUM",
      qrCode: "https://via.placeholder.com/120x120/ffffff/000000?text=QR",
      registrationLink: "#",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 3,
      title: "SOLANA BUILDERS",
      subtitle: "Fast, secure, and scalable. Build the next generation of dApps on Solana blockchain.",
      brand: "SOLANA",
      coHost: "Phantom",
      image: "https://via.placeholder.com/600x400/1a1a1a/9945ff?text=SOLANA",
      qrCode: "https://via.placeholder.com/120x120/ffffff/000000?text=QR",
      registrationLink: "#",
      createdAt: new Date("2024-01-05"),
    },
    {
      id: 4,
      title: "POLYGON DEVCON",
      subtitle: "Scale your dApps with Polygon's Layer 2 solutions. Workshop and networking event.",
      brand: "POLYGON",
      coHost: "Matic Network",
      image: "https://via.placeholder.com/600x400/1a1a1a/8247e5?text=POLYGON",
      qrCode: "https://via.placeholder.com/120x120/ffffff/000000?text=QR",
      registrationLink: "#",
      createdAt: new Date("2024-01-01"),
    },
  ])

  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  // Sort events by creation date (latest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % sortedEvents.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + sortedEvents.length) % sortedEvents.length)
  }

  const goToEvent = (index) => {
    setCurrentEventIndex(index)
  }

  return (
    <EventContext.Provider
      value={{
        events: sortedEvents,
        currentEventIndex,
        currentEvent: sortedEvents[currentEventIndex],
        nextEvent,
        prevEvent,
        goToEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
