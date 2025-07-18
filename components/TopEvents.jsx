'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const API_URL = 'http://localhost:5000/api/events/getEventHighlights';

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/events/${event._id}`}
      className="block relative w-full h-64 md:h-72 lg:h-80 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={
          event.eventimage ||
          `https://placehold.co/400x250/4b5563/d1d5db?text=${encodeURIComponent(
            event.eventname || 'Event'
          )}`
        }
        alt={event.eventname}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.3 : 1 }}
        onError={(e) => {
          e.currentTarget.src =
            'https://placehold.co/400x250/4b5563/d1d5db?text=Image+Not+Found';
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-white text-center">
          <h3 className="text-lg font-bold mb-2">
            {event.eventname || 'Untitled Event'}
          </h3>
          <p className="text-sm">{event.description || 'No description'}</p>
        </div>
      </div>
    </Link>
  );
};

const CarouselSection = ({ title, events, loading }) => {
  const carouselRef = useRef(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    setShowLeftGradient(scrollLeft > 10);
    setShowRightGradient(scrollLeft < maxScroll - 10);
  };

  // Check scroll position on mount and window resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [events]);

  if (loading) {
    return (
      <section className="bg-gray-900 text-white p-4 font-inter">
        <h1 className="text-xl md:text-2xl mb-6 px-4">{title}</h1>
        <div className="flex space-x-6 px-4 pb-6 overflow-x-auto scrollbar-hide">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-80 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!events?.length) {
    return (
      <section className="bg-gray-900 text-white p-4 font-inter">
        <h1 className="text-xl md:text-2xl mb-6 px-4">{title}</h1>
        <div className="text-center py-12 px-4">
          <p className="text-gray-400">No events available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 text-white p-4 font-inter">
      <h1 className="text-xl md:text-2xl mb-6 px-4">{title}</h1>
      <div className="relative">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex space-x-6 pb-6 px-4 overflow-x-auto scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {events.map((event, index) => (
            <div
              key={event._id || index}
              className="flex-shrink-0 w-64 md:w-72 transition-transform duration-300 hover:scale-105"
              style={{ scrollSnapAlign: 'start' }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
        
        {/* Gradient fade effects */}
        {showLeftGradient && (
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
        )}
        {showRightGradient && (
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        )}
      </div>
    </section>
  );
};

const TopEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return <CarouselSection title="Featured Events" events={events} loading={loading} />;
};

export default TopEvents;
