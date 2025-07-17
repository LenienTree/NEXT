"use client"

import { createContext, useContext, useState, useEffect } from "react"

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
      image: "/placeholder.svg?height=400&width=600",
      qrCode: "/placeholder.svg?height=120&width=120",
      registrationLink: "#",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "ETHEREUM SUMMIT",
      subtitle: "Join the future of decentralized finance. Connect with industry leaders and innovators.",
      brand: "ETHEREUM",
      coHost: "ConsenSys",
      image: "/placeholder.svg?height=400&width=600",
      qrCode: "/placeholder.svg?height=120&width=120",
      registrationLink: "#",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 3,
      title: "SOLANA BUILDERS",
      subtitle: "Fast, secure, and scalable. Build the next generation of dApps on Solana blockchain.",
      brand: "SOLANA",
      coHost: "Phantom",
      image: "/placeholder.svg?height=400&width=600",
      qrCode: "/placeholder.svg?height=120&width=120",
      registrationLink: "#",
      createdAt: new Date("2024-01-05"),
    },
    {
      id: 4,
      title: "POLYGON DEVCON",
      subtitle: "Scale your dApps with Polygon's Layer 2 solutions. Workshop and networking event.",
      brand: "POLYGON",
      coHost: "Matic Network",
      image: "/placeholder.svg?height=400&width=600",
      qrCode: "/placeholder.svg?height=120&width=120",
      registrationLink: "#",
      createdAt: new Date("2024-01-01"),
    },
  ])

  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Sort events by creation date (latest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying || sortedEvents.length === 0) return

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % sortedEvents.length)
    }, 5000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, sortedEvents.length])

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % sortedEvents.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + sortedEvents.length) % sortedEvents.length)
  }

  const goToEvent = (index) => {
    setCurrentEventIndex(index)
  }

  // Auto-play controls
  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev)
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
  }

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true)
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
        isAutoPlaying,
        toggleAutoPlay,
        pauseAutoPlay,
        resumeAutoPlay,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}