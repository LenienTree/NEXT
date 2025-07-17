"use client"
import { useEvents } from "../context/EventContext"
import "./CarouselControls.css"

const CarouselControls = () => {
  const { events, currentEventIndex, nextEvent, prevEvent, goToEvent } = useEvents()

  return (
    <div className="carousel-controls">
      {/* Previous Button */}
      <button onClick={prevEvent} className="control-btn prev-btn" aria-label="Previous event">
        ‹
      </button>

      {/* Dots Indicator */}
      <div className="dots-container">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToEvent(index)}
            className={`dot ${index === currentEventIndex ? "active" : ""}`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button onClick={nextEvent} className="control-btn next-btn" aria-label="Next event">
        ›
      </button>
    </div>
  )
}

export default CarouselControls
