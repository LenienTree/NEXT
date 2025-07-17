import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Lucide icons
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

// Sample data for the event cards
const eventsData = [
  {
    id: 1,
    image: 'https://placehold.co/400x250/065f46/ffffff?text=Techfest+2024',
    title: 'Annual Techfest 2024',
    description: 'Join us for the biggest technology festival of the year, featuring workshops, hackathons, and expert talks on AI, blockchain, and more.',
  },
  {
    id: 2,
    image: 'https://placehold.co/400x250/047857/ffffff?text=Innovation+Summit',
    title: 'Innovation Summit',
    description: 'A summit dedicated to groundbreaking innovations and future technologies. Network with industry leaders and discover new trends.',
  },
  {
    id: 3,
    image: 'https://placehold.co/400x250/059669/ffffff?text=Code+Challenge',
    title: 'Global Code Challenge',
    description: 'Test your coding skills against the best! Solve complex problems and win exciting prizes in this international coding competition.',
  },
  {
    id: 4,
    image: 'https://placehold.co/400x250/065f46/ffffff?text=AI+Workshop',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop covering the fundamentals of Artificial Intelligence and Machine Learning, suitable for beginners and intermediates.',
  },
  {
    id: 5,
    image: 'https://placehold.co/400x250/047857/ffffff?text=Cyber+Security+Conf',
    title: 'Cyber Security Conference',
    description: 'Learn about the latest threats and defense strategies in cybersecurity from leading experts and practitioners.',
  },
  {
    id: 6,
    image: 'https://placehold.co/400x250/059669/ffffff?text=DevOps+Days',
    title: 'DevOps Days',
    description: 'Explore the world of DevOps with talks, workshops, and open spaces covering continuous integration, delivery, and deployment.',
  },
  {
    id: 7,
    image: 'https://placehold.co/400x250/065f46/ffffff?text=Gaming+Expo',
    title: 'Future Gaming Expo',
    description: 'Experience the future of gaming with new game reveals, VR experiences, and esports tournaments.',
  },
  {
    id: 8,
    image: 'https://placehold.co/400x250/047857/ffffff?text=Data+Science+Meetup',
    title: 'Data Science Meetup',
    description: 'Connect with data scientists, share insights, and discuss the latest advancements in data analytics and big data.',
  },
];

// Card component to display individual event details
const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.3 : 1, aspectRatio: "3 / 4" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x250/4b5563/d1d5db?text=Image+Error`;
        }}
      
      />

      {/* Overlay for explanation on hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-white text-center">
          <h3 className="text-lg md:text-lg font-bold mb-2">{event.title}</h3>
          <p className="text-sm md:text-base">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

// New CarouselSection component to encapsulate individual carousel logic and state
const CarouselSection = ({ title, events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(2); // Default to 2 cards for mobile initially
  const carouselRef = useRef(null);

  const cardsPerViewBreakpoints = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  };

  const calculateCardsToShow = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return cardsPerViewBreakpoints.desktop;
      if (window.innerWidth >= 768) return cardsPerViewBreakpoints.tablet;
    }
    return cardsPerViewBreakpoints.mobile;
  }, [cardsPerViewBreakpoints]);

  useEffect(() => {
    const updateDisplaySettings = () => {
      const numCards = calculateCardsToShow();
      setCardsToShow(numCards);

      if (carouselRef.current) {
        const gap = 24; // Corresponds to Tailwind's 'gap-6' (1.5rem = 24px)
        const containerWidth = carouselRef.current.offsetWidth;
        const calculatedCardWidth = (containerWidth - (numCards - 1) * gap) / numCards;
        setCardWidth(calculatedCardWidth);
      }
    };

    updateDisplaySettings();
    window.addEventListener('resize', updateDisplaySettings);
    return () => window.removeEventListener('resize', updateDisplaySettings);
  }, [calculateCardsToShow]);

  const totalEvents = events.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex > totalEvents - cardsToShow) {
        return 0;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      const maxIndex = totalEvents - cardsToShow;
      if (nextIndex < 0) {
        return maxIndex;
      }
      return nextIndex;
    });
  };

  const translateXValue = -currentIndex * (cardWidth + 24);

  return (
    <div className="max-h-screen bg-gray-900 text-white p-4 flex flex-col justify-center font-inter">
      <h1 className="text-xl md:text-2xl md:mt-8 md:mb-4 md:ml-8 text-left">{title}</h1>

      <div className="relative w-full max-w-8xl">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Previous Event"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div ref={carouselRef} className="overflow-hidden px-12"> {/* Added overflow-hidden and px-12 */}
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className={`flex-shrink-0`}
                style={{ width: `${cardWidth}px` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Next Event"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  // You can create different data sets for each carousel if needed
  const hackathonEvents = eventsData.slice(0, 8); // Example: first 5 events for hackathons
  const techfestEvents = eventsData.slice(2, 7); // Example: different slice for techfests
  const ideathonEvents = eventsData.slice(4, 8); // Example: another slice for ideathons

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter py-8">
      {/* Render multiple independent CarouselSection components */}
      <CarouselSection title="Upcoming Hackathons" events={hackathonEvents} />
      <CarouselSection title="Upcoming Techfests" events={techfestEvents} />
      <CarouselSection title="Upcoming Ideathons" events={ideathonEvents} />
    </div>
  );
};

export default App;
