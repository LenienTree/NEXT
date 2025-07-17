"use client"

import { useEvents } from "../context/EventContext"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export default function CarouselControls() {
  const { 
    events, 
    currentEventIndex, 
    nextEvent, 
    prevEvent, 
    goToEvent,
    isAutoPlaying,
    toggleAutoPlay,
    pauseAutoPlay,
    resumeAutoPlay
  } = useEvents()

  return (
    <div className="flex items-center justify-center mt-8 space-x-4">
     
      <button
        onClick={() => {
          prevEvent()
          pauseAutoPlay() 
        }}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-600"
        aria-label="Previous event"
      >
        <ChevronLeft size={20} />
      </button>

     
      <div 
        className="flex space-x-2"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToEvent(index)
              pauseAutoPlay() 
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentEventIndex 
                ? "bg-green-400 scale-125" 
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>

     
      <button
        onClick={() => {
          nextEvent()
          pauseAutoPlay() 
        }}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-600"
        aria-label="Next event"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}