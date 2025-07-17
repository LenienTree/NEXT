"use client"

import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"
import CarouselControls from "./CarouselControls"

export default function EventCarousel() {
  const { events, currentEventIndex } = useEvents()


     const getEventImage = (eventId, brand) => {
    const imageMap = {
      1: "/images/bnb-hack-kerala.jpg",     // BNB HACK KERALA
      2: "/images/ethereum-summit.jpg",     // ETHEREUM SUMMIT
      3: "/images/solana-builders.jpg",     // SOLANA BUILDERS
      4: "/images/polygon-devcon.jpg",      // POLYGON DEVCON
    }

    // Alternative: Map by brand name
    const brandImageMap = {
      "BNB CHAIN": "/images/bnb-event.jpg",
      "ETHEREUM": "/images/ethereum-event.jpg",
      "SOLANA": "/images/solana-event.jpg",
      "POLYGON": "/images/polygon-event.jpg",
    }

    // Return mapped image or fallback
    return imageMap[eventId] || brandImageMap[brand] || "/images/default-event.jpg"
  }

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Event Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="w-full flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <CarouselControls />
      </div>
    </div>
  )
}
