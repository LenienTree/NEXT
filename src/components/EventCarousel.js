import { useEvents } from "../context/EventContext"
import EventCard from "./EventCard"
import CarouselControls from "./CarouselControls"
import "./EventCarousel.css"

const EventCarousel = () => {
  const { events, currentEventIndex } = useEvents()

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Event Cards Container */}
        <div className="carousel-track-container">
          <div className="carousel-track" style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}>
            {events.map((event) => (
              <div key={event.id} className="carousel-slide">
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

export default EventCarousel
