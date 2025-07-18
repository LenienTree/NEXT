"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const API_URL = 'http://localhost:5000/api/events/getEventHighlights';

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/events/${event._id}`} className="block relative w-full h-64 md:h-72 lg:h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img
        src={event.eventimage || `https://placehold.co/400x250/4b5563/d1d5db?text=${encodeURIComponent(event.eventname || 'Event')}`}
        alt={event.eventname}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.3 : 1, aspectRatio: "3 / 4" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x250/4b5563/d1d5db?text=Image+Not+Found`;
        }}
      />

      <div
        className={`absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-white text-center">
          <h3 className="text-lg md:text-lg font-bold mb-2">{event.eventname || 'Untitled Event'}</h3>
          <p className="text-sm md:text-base">{event.description || 'No description available'}</p>
        </div>
      </div>
    </Link>
  );
};

const CarouselSection = ({ title, events, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(2);
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
        const gap = 24;
        const containerWidth = carouselRef.current.offsetWidth;
        const calculatedCardWidth = (containerWidth - (numCards - 1) * gap) / numCards;
        setCardWidth(calculatedCardWidth);
      }
    };

    updateDisplaySettings();
    window.addEventListener('resize', updateDisplaySettings);
    return () => window.removeEventListener('resize', updateDisplaySettings);
  }, [calculateCardsToShow]);

  const totalEvents = events?.length || 0;

  const handleNext = () => {
    if (totalEvents === 0) return;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex > totalEvents - cardsToShow) {
        return 0;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    if (totalEvents === 0) return;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      const maxIndex = totalEvents - cardsToShow;
      if (nextIndex < 0) {
        return maxIndex > 0 ? maxIndex : 0;
      }
      return nextIndex;
    });
  };

  const translateXValue = -currentIndex * (cardWidth + 24);

  if (loading) {
    return (
      <div className="max-h-screen bg-gray-900 text-white p-4 flex flex-col justify-center font-inter">
        <h1 className="text-xl md:text-2xl md:mt-8 md:mb-4 md:ml-8 text-left">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-lg h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="max-h-screen bg-gray-900 text-white p-4 flex flex-col justify-center font-inter">
        <h1 className="text-xl md:text-2xl md:mt-8 md:mb-4 md:ml-8 text-left">{title}</h1>
        <div className="text-center py-12">
          <p className="text-gray-400">No events available at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-900 text-white p-4 flex flex-col justify-center font-inter">
      <h1 className="text-xl md:text-2xl md:mt-8 md:mb-4 md:ml-8 text-left">{title}</h1>

      <div className="relative w-full max-w-8xl">
        <button
          onClick={handlePrev}
          disabled={totalEvents <= cardsToShow}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Event"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div ref={carouselRef} className="overflow-hidden px-12">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {events.map((event, index) => (
              <div
                key={event._id || index}
                className="flex-shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={totalEvents <= cardsToShow}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Event"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const TopEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <CarouselSection 
      title="Featured Events" 
      events={events} 
      loading={loading} 
    />
  );
};

export default TopEvents;